import {useEffect, useContext} from 'react'
import * as AuthService from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Logout = () => {

    const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);

    useEffect(() => {
        AuthService.logout(user.accessToken)
            .then(() => {
                userLogout()
                console.log('works logout')
                navigate('/')
            })
            .catch(() => {
                navigate('/')
            })
    })

}