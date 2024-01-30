import * as SecureStore from 'expo-secure-store'

export const setSecureItem = async (name, value) => {
    await SecureStore.setItemAsync(name, JSON.stringify(value))
}

export const getSecureItem = async name => {
    let result = await SecureStore.getItemAsync(name)
    return result ? JSON.parse(result) : result
}

export const deleteSecureItem = async name => {
    await SecureStore.deleteItemAsync(name)
}
