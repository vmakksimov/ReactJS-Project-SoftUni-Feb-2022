import * as request from './request'

const baseUrl = 'http://localhost:3030/users'

export const login = (username, password) => request.post(`${baseUrl}/login`, { username, password })
export const register = (email, password, username, image) => request.post(`${baseUrl}/register`, { email, password, username, image })