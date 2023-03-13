import './Login.css'
import { Link } from 'react-router-dom'

export const Login = () => {
    const userLogin = (e) => {
        console.log(e)
    }
    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>
           
            <form className="form1" method="POST" onSubmit={userLogin}>
                <input className="un " type="text" name="username" align="center" placeholder="Username" />
                <input className="pass" type="password" name="password" align="center" placeholder="Password" />
                <button type="submit" className="submit login" align="center">Sign in</button>
                <p className="forgot" align="center"></p>
            </form>
            <Link to="/register" className="register-link-log" align="center">Not registered yet? <strong>Click here!</strong></Link>
        </div>
		
    )
}