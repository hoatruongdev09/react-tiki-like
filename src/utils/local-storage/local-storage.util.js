export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    USER_CART: 'user_cart'
}

export const saveDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, data)
}
export const getDataFromLocalStorage = (key) => {
    return localStorage.getItem(key)
}

export const removeDataFromLocalStorage = (key) => {
    localStorage.removeItem(key)
}