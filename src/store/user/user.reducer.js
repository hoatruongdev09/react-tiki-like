import USER_TYPES from './user.types'

const INITIAL_STATE = {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    avatar: undefined,
    zipcode: undefined,
    gender: undefined
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_TYPES.SET_USER_DATA:
            return {
                ...state,
                ...payload
            }
        case USER_TYPES.CLEAR_USER_DATA:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state
    }
}