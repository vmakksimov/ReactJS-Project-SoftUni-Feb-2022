import * as request from './request'

const baseUrl = 'http://localhost:3030/users'

export const login = (email, password) => request.post(`${baseUrl}/login`, { email, password })
export const register = (email, password, username, image, first_name, last_name, usertype) => request.post(`${baseUrl}/register`, { email, password, username, image, first_name, last_name, usertype })
export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        })

        return response;

    } catch (error) {

    }
}

export const getUser = (accessToken) => request.get(`${baseUrl}/me`, {headers: {'X-Authorization': accessToken}})
export const updateUser = (accessToken) => request.put(`${baseUrl}/me`, {headers: {'X-Authorization': accessToken}})
