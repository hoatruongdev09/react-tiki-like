import USER_TYPES from './user.types'

const INITIAL_STATE = {
    id: undefined,
    role: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_TYPES.SET_USER_DATA:
            const { id, role, email, firstName, lastName } = payload
            return {
                ...state,
                id: id,
                role: role,
                email: email,
                firstName: firstName,
                lastName: lastName
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