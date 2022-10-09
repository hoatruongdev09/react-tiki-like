import { STORAGE_KEYS, getDataFromLocalStorage, saveDataToLocalStorage } from '../../utils/local-storage/local-storage.util'
import CART_TYPES from './cart.types'

const INITIAL_VALUE = {
    items: JSON.parse(getDataFromLocalStorage(STORAGE_KEYS.USER_CART)) || []
}

export const cartReducer = (state = INITIAL_VALUE, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_TYPES.ADD_TO_CART:
            {
                const { id, amount } = payload
                const existItem = state.items.find(it => it.id == id)
                if (existItem) {
                    return {
                        items: state.items.map(it => it.id == id ? { ...it, count: it.count + amount } : it)
                    }
                } else {
                    return {
                        items: [...state.items, { id, count: amount }]
                    }
                }
            }
        case CART_TYPES.REMOVE_FROM_CART:
            {
                const { id, amount } = payload
                const existItem = state.items.find(it => it.id == id)
                if (existItem) {
                    if (existItem.count - amount <= 0) {
                        return {
                            items: state.items.filter(it => it.id != id)
                        }
                    } else {
                        return {
                            items: state.items.map(it => it.id == id ? { ...it, count: it.count - amount } : it)
                        }
                    }
                } else {
                    return {
                        ...state
                    }
                }
            }
        case CART_TYPES.DELETE_CART_ITEM:
            return {
                items: state.items.filter(it => it.id != payload)
            }
        case CART_TYPES.CLEAR_CART:
            console.log('clear cart items')
            return {
                items: []
            }
        case CART_TYPES.SAVE_CART:
            saveDataToLocalStorage(STORAGE_KEYS.USER_CART, JSON.stringify(state.items))
            return state
        default:
            return state

    }
}

