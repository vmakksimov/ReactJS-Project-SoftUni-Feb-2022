import { AuthContext } from "../../../../context/AuthContext"
import { useContext } from "react"

import { useState, } from "react"
import { useNavigate } from "react-router-dom"
import * as authService from '../../../../services/authService'

export const EditProfile = () => {

    const { user, userLogin, editProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('onsubmit')
     

        const userData = Object.fromEntries(new FormData(e.target))

        const password = userData.password
        const confirmPassword = userData.re_password
        console.log(confirmPassword)

        if (password !== confirmPassword) {
            return;
        }

        const final = { userData }


        console.log('get user below')
        editProfile(userData)
        authService.updateUser(user.accessToken)
            .then(res => console.log(res))
        // userLogin(res)
        navigate('/')
        console.log('haha')


    }

    return (
        <div className="container-register">
            <div className="title sign">Edit your profile</div>

            <div className="content">
                <form onSubmit={onSubmit}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type="text" name="username" placeholder="Enter your username" defaultValue={user.username} />
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type="text" name="email" placeholder="Enter your email" defaultValue={user.email} />
                        </div>
                        <div className="input-box">
                            <span className="details">First Name</span>
                            <input type="text" name="first_name" placeholder="Enter your first name" defaultValue={user.first_name} />
                        </div>
                        <div className="input-box">
                            <span className="details">Last Name</span>
                            <input type="text" name="last_name" placeholder="Enter your last name" defaultValue={user.last_name} />
                        </div>

                        <div className="input-box">
                            <span className="details">Password</span>
                            <input type="password" name="password" placeholder="Enter your password" defaultValue={user.password} />
                        </div>
                        <div className="input-box">
                            <span className="details">Confirm Password</span>
                            <input type="password" name="re_password" placeholder="Confirm your password" defaultValue={user.re_password} />
                        </div>
                        <div className="input-box">
                            <span className="details">Avatar Url</span>
                            <input type="text" name="user_imageUrl" placeholder="Avatar Image Url" defaultValue={user.user_imageUrl} />
                        </div>
                        <div className="input-box">
                            <span className="details">Sign up as</span>
                            <select name="user_type">
                                <option value="teacher">Author</option>
                                <option value="student">Reader</option>
                            </select>
                        </div>
                    </div>

                    <div className="button">
                        <input type="submit" value="Edit" />
                    </div>
                </form>
            </div>
        </div>
    )
}