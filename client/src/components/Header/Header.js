import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"


export const Header = () => {

    const { user } = useContext(AuthContext)

    return (
        <div id="header-wrap">

            {/*top-content*/}
            <header id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="main-logo">
                                <a href="index.html">
                                    <img src="styles/images/main-logo.png" alt="logo" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <nav id="navbar">
                                <div className="main-menu stellarnav">
                                    <ul className="menu-list">
                                        <li className="menu-item active">
                                            <Link to="/" data-effect="Home">
                                                Home
                                            </Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link to="#about" className="nav-link" data-effect="About">
                                                About
                                            </Link>
                                        </li>

                                        <li className="menu-item">
                                            <Link
                                                to="#latest-blog"
                                                className="nav-link"
                                                data-effect="Articles"
                                            >
                                                Books
                                            </Link>
                                        </li>
                                        {user.accessToken
                                            ? <li className="menu-item">
                                                <Link
                                                    to="/logout"
                                                    className="nav-link"
                                                    data-effect="Articles"
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                            : <> <li className="menu-item">
                                                <Link
                                                    to="/login"
                                                    className="nav-link"
                                                    data-effect="Articles"
                                                >
                                                    Login
                                                </Link>
                                            </li>
                                                <li className="menu-item">
                                                    <Link
                                                        to="/register"
                                                        className="nav-link"
                                                        data-effect="Articles"
                                                    >
                                                        Register
                                                    </Link>
                                                </li></>
                                        }



                                        <li className="menu-item">
                                            <Link
                                                to="#contact"
                                                className="nav-link"
                                                data-effect="Contact"
                                            >
                                                Contact
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="hamburger">
                                        <span className="bar" />
                                        <span className="bar" />
                                        <span className="bar" />
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}