import './Login.css'
import { Link } from 'react-router-dom'
import { login } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export const Login = () => {
    const navigate = useNavigate();
    const {userLogin} = useContext(AuthContext)

    const onLogin = (e) => {
        e.preventDefault()
        const {email, password } = Object.fromEntries(new FormData(e.target))
        console.log(email)
        console.log(password)

        login(email, password)
            .then(authData => {
                console.log('haha')
                console.log(authData)
                 userLogin(authData)
                navigate('/')
            })
            .catch(() => {
                navigate('/404')
            })
    }
  
    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>
           
            <form className="form1" method="POST" onSubmit={onLogin}>
                <input className="un " type="email" name="email" align="center" placeholder="Email" />
                <input className="pass" type="password" name="password" align="center" placeholder="Password" />
                <button type="submit" className="submit login" align="center">Sign in</button>
                <p className="forgot" align="center"></p>
            </form>
            <Link to="/register" className="register-link-log" align="center">Not registered yet? <strong>Click here!</strong></Link>
        </div>
		
    )
}