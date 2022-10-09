import { createAction } from '../../utils/reducer/reducer.util'
import USER_TYPES from './user.types'

export const setUserData = (user) => { return createAction(USER_TYPES.SET_USER_DATA, user) }
export const clearUserData = () => { return createAction(USER_TYPES.CLEAR_USER_DATA, null) }
