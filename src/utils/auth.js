import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getInfo() {
  return JSON.parse(Cookies.get('info'))
}

export function setInfo(info) {
  return Cookies.set('info', info)
}

export function removeInfo() {
  return Cookies.remove('info')
}
