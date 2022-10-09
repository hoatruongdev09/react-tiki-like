import { createAction } from '../../utils/reducer/reducer.util'
import CART_TYPES from './cart.types'

export const addItemToCart = (itemId, amount) => {
    return createAction(CART_TYPES.ADD_TO_CART, { id: itemId, amount })
}

export const removeItemFromCart = (itemId, amount) => {
    return createAction(CART_TYPES.REMOVE_FROM_CART, { id: itemId, amount })
}

export const deleteItemFromCart = (itemId) => {
    return createAction(CART_TYPES.DELETE_CART_ITEM, itemId)
}

export const clearCartItem = () => {
    return createAction(CART_TYPES.CLEAR_CART, null)
}

export const saveCart = () => {
    return createAction(CART_TYPES.SAVE_CART, null)
}