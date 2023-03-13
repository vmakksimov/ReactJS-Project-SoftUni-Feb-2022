import {request} from './requester'

const baseUrl = 'http://localhost:3030/users'

export const login = (username, password) => request('POST', `${baseUrl}/login`, { username, password })
export const register = (username, password) => request('POST', `${baseUrl}/register`, { username, password })