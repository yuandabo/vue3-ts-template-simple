import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(name: string) {
  return window.localStorage.setItem('username', name)
}

export function getUserName() {
  return window.localStorage.getItem('username')
}

export function removeUserName() {
  return window.localStorage.removeItem('username')
}
