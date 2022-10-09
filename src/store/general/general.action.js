import { createAction } from '../../utils/reducer/reducer.util'
import GENERAL_TYPES from './general.types'


export const setShowNavBar = (isShow) => {
    return createAction(GENERAL_TYPES.SET_SHOW_NAVBAR, isShow)
}

export const setAccessToken = (token) => {
    return createAction(GENERAL_TYPES.SET_ACCESS_TOKEN, token)
}

export const setAuthorize = (authorized) => {
    return createAction(GENERAL_TYPES.SET_AUTHORIZED, authorized)
}

export const clearAuthorization = () => {
    return createAction(GENERAL_TYPES.CLEAR_AUTHORIZATION, null)
}

export const setSelectedCustomerTab = (index) => {
    return createAction(GENERAL_TYPES.SET_SELECTED_CUSTOMER_TAB, index)
}

export const setLastRouteBeforeAuth = (url) => {
    return createAction(GENERAL_TYPES.SET_LAST_ROUTE_BEFORE_AUTH, url)
}