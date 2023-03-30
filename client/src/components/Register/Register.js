import "./Register.css"

import { useState, useContext } from "react"
import * as AuthService from '../../services/authService'
import { Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import * as bookService from '../../services/bookService'
import { RegisterValidation } from "./Validation/RegisterValidation"

export const Register = ({ addUsersHandler }) => {

    const [user, setState] = useState([]);
    const navigate = useNavigate();
    const { userLogin, users } = useContext(AuthContext);

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        re_password: '',
        // country: '',
        // city: '',
        // streetNumber: '',
    });

    const ChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }


    const validationHandler = (e, bound) => {
        let currentUser;
        // let currentEmail;
        // let currentUsername
        // currentEmail = users.map(x => x.email == e.target.value)
        // currentUsername = users.map(x => x.username == e.target.value)
        bookService.getUsers()
            .then(res => {
                if (res) {
                    currentUser = Object.values(res).map(x => x.username == e.target.value || x.email == e.target.value)
                    if (currentUser.includes(true)) {
                        setErrors({
                            [e.target.name]: values[e.target.name]
                        })
                    }else{
                        setErrors({})
                    }

                    if (bound && e.target.value.length < bound) {

                        setErrors({
                            [e.target.name]: values[e.target.name]
                        })
            
                    }
            
                    if (e.target.name == 'password' && e.target.parentElement.parentElement.children[5].children[1].value.length > 0) {
                        const repassword = e.target.parentElement.parentElement.children[5].children[1].name
            
                        if (e.target.parentElement.parentElement.children[5].children[1].value != e.target.value) {
                            setErrors({
                                [repassword]: values[repassword]
                            })
                        }
                    }
            
                    if (e.target.name == 're_password' && e.target.parentElement.parentElement.children[4].children[1].value != e.target.value) {
                        setErrors({
                            [e.target.name]: values[e.target.name]
                        })
                    }

                } else {
                    setErrors({})
                }
            })
    }



    // if (registeredUser) {
    //     setErrors({
    //         [e.target.name]: values[e.target.name]
    //     })



    // }
    // )





    const onRegister = (e) => {
        e.preventDefault()

        const usersData = Object.fromEntries(new FormData(e.target))
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const username = formData.get('username')
        const image = formData.get('user_imageUrl')
        const usertype = formData.get('user_type')
        const first_name = formData.get('first_name')
        const last_name = formData.get('last_name')
        const confirmPassword = formData.get('re_password')

        if (password !== confirmPassword) {
            return
        }

        // let currentEmail;
        // let currentUsername
        let currentUser
        // currentEmail = users.map(x => x.email == email)
        // currentUsername = users.map(x => x.username == username)

        bookService.getUsers()
            .then(res => {
                if (res) {
                    currentUser = Object.values(res).map(x => x.username == username || x.email == email)

                    if (currentUser.includes(true)) {
                        return navigate('/404')
                    } else {
                        bookService.createUser(usersData)
                        addUsersHandler(usersData)

                        AuthService.register(email, password, username, image, first_name, last_name, usertype)
                            .then(res => {
                                userLogin(res)
                                navigate('/')

                            })
                            .catch(() => {
                                navigate('/404')
                            })
                    }
                }



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
                            <input type="text" name="username" values={values.username} onChange={ChangeHandler} onBlur={(e) => validationHandler(e)} placeholder="Enter your username" required />
                            {errors.username &&
                                <p className="form-error" >
                                    Username already exists!
                                </p>
                            }
                        </div>

                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type="text" name="email" values={values.email} onChange={ChangeHandler} onBlur={(e) => validationHandler(e)} placeholder="Enter your email" required />
                            {errors.email &&
                                <p className="form-error" >
                                    Email already in the database!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details">First Name</span>
                            <input type="text" name="first_name" values={values.first_name} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)} placeholder="Enter your first name" required />

                            {errors.first_name &&
                                <p className="form-error" >
                                    The First name should be at least 2 characters!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details">Last Name</span>
                            <input type="text" name="last_name" values={values.last_name} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)} placeholder="Enter your last name" required />
                            {errors.last_name &&
                                <p className="form-error" >
                                    The Last name should be at least 2 characters!
                                </p>
                            }
                        </div>

                        <div className="input-box">
                            <span className="details">Password</span>
                            <input type="password" name="password" values={values.password} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 8)} placeholder="Enter your password" required />
                            {errors.re_password ?

                                <p className="form-error" >
                                    Passwords don't match!
                                </p>
                                : errors.password && <p className="form-error" >
                                    The password should be at least 8 characters long!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details">Confirm Password</span>
                            <input type="password" name="re_password" values={values.password} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 8)} placeholder="Confirm your password" required />
                            {errors.re_password &&
                                <p className="form-error" >
                                    Passwords don't match!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details">Avatar Url</span>
                            <input type="text" name="user_imageUrl" placeholder="Avatar Image Url" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Sign up as</span>
                            <select name="user_type">
                                <option value="author">Author</option>
                                <option value="reader">Reader</option>
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