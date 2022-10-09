import { getDataFromLocalStorage, removeDataFromLocalStorage, STORAGE_KEYS } from '../../utils/local-storage/local-storage.util'
import GENERAL_TYPES from './general.types'

const INIT_STATE = {
    showNavBar: true,
    accessToken: getDataFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN) || '',
    authorized: false,
    lastRouteBeforeAuth: '/',
    customerSelectedTab: 0
}

export const generalReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case GENERAL_TYPES.SET_SHOW_NAVBAR:
            return {
                ...state,
                showNavBar: payload
            }
        case GENERAL_TYPES.SET_AUTHORIZED:
            return {
                ...state,
                authorized: payload
            }
        case GENERAL_TYPES.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: payload
            }
        case GENERAL_TYPES.CLEAR_AUTHORIZATION:
            removeDataFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN)
            return {
                ...state,
                authorized: false,
                accessToken: ''
            }
        case GENERAL_TYPES.SET_SELECTED_CUSTOMER_TAB:
            return {
                ...state,
                customerSelectedTab: payload
            }
        case GENERAL_TYPES.SET_LAST_ROUTE_BEFORE_AUTH:
            return {
                ...state,
                lastRouteBeforeAuth: payload
            }
        default:
            return state
    }
}