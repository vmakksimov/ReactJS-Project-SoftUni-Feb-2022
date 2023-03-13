import "./Register.css"

import { useState } from "react"
import * as AuthService from '../../services/authService'
import { Navigate, useNavigate } from "react-router-dom"

export const Register = () => {

    const [user, setState] = useState([]);
    const navigate = useNavigate();



    const onRegister = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const username = formData.get('username')
        const password = formData.get('password')
        const confirmPassword = formData.get('re_password')

        
        console.log(password)
        console.log(confirmPassword)
        
        if (password !== confirmPassword){
            return;
        }
        console.log('works')

        AuthService.register(username, password)
            .then(res => {
                console.log(res)
                navigate('/')
                
            })

    }
    return (
        <div className="container-register">
            <div className="title sign">Registration</div>
           
            <div className="content">
                <form method="POST" onSubmit={onRegister}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type="text" name="username" placeholder="Enter your username" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type="text" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="input-box">
                            <span className="details">First Name</span>
                            <input type="text" name="first_name" placeholder="Enter your first name" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Last Name</span>
                            <input type="text" name="last_name" placeholder="Enter your last name" required />
                        </div>

                        <div className="input-box">
                            <span className="details">Password</span>
                            <input type="password" name="password" placeholder="Enter your password" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Confirm Password</span>
                            <input type="password" name="re_password" placeholder="Confirm your password" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Avatar Url</span>
                            <input type="text" name="user_imageUrl" placeholder="Avatar Image Url" required />
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
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>

    )
}