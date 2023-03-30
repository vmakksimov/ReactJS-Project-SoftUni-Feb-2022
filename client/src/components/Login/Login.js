import './Login.css'
import { Link } from 'react-router-dom'
import { login } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'
import * as bookService from '../../services/bookService'

export const Login = () => {
    const navigate = useNavigate();
    const { userLogin, users } = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({

        email: '',
        password: '',
       
    });

    const ChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }



    const validationHandler = (e) => {
        bookService.getUsers()
            .then(res => {
                let currentpass
                let email;

                if (res !== undefined) {
                    currentpass = Object.values(res).find(x => x.password == e.target.value)
                    email = Object.values(res).find(x => x.email == e.target.value)
                    
                    if (e.target.name == 'email'){
                        if (email === undefined){
                            setErrors({
                                [e.target.name]: values[e.target.name]
                            })
                        } 

                        if (currentpass && e.target.parentElement.children[1].value != currentpass.password){
                            setErrors({
                                [e.target.name]: values[e.target.name]
                            })
                        }

                        if (currentpass && currentpass.email != e.target.value){
                            setErrors({
                                [e.target.name]: values[e.target.name]
                            })
                        }

                        

                        
                    }else if (e.target.name == 'password'){
                        console.log('here pass')
                        if (currentpass === undefined){
                            setErrors({
                                [e.target.name]: values[e.target.name]
                            })
                        } 
    
                        if (currentpass && e.target.parentElement.children[0].value != currentpass.email) {
                            setErrors({
                                [e.target.name]: values[e.target.name]
                            })
                        }

                        if (currentpass && currentpass.password != e.target.value) {
                            setErrors({
                                [e.target.name]: values[e.target.name]
                            })
                        }
                    }

                }
            })
            setErrors({})
    }
    

    const onLogin = (e) => {
        e.preventDefault()
        const { email, password } = Object.fromEntries(new FormData(e.target))

        if (errors){
            return navigate('/404')
        }
        
        login(email, password)
            .then(authData => {
                userLogin(authData)
                navigate('/')
            })
            .catch(() => {
                console.log('username or password incorrecct')
                navigate('/404')
            })

    }

    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>

            <form className="form1" method="POST" onSubmit={onLogin}>
                <input className="un " type="email" name="email" values={values.email} onChange={ChangeHandler} onBlur={(e) => validationHandler(e)} align="center" placeholder="Email" />
                {errors.email &&
                    <p className="form-error" style={{ marginTop: '0px' }}>
                        Incorrect email.
                    </p>
                }

                <input className="pass" type="password" name="password" align="center" values={values.password} onChange={ChangeHandler} onBlur={(e) => validationHandler(e)} placeholder="Password" />
                {errors.password &&
                    <p className="form-error" style={{ marginTop: '0px' }}>
                        Incorrect password.
                    </p>
                }
                <button type="submit" className="submit login" align="center">Sign in</button>
                <p className="forgot" align="center"></p>
            </form>
            <Link to="/register" className="register-link-log" align="center">Not registered yet? <strong>Click here!</strong></Link>
        </div>

    )
}