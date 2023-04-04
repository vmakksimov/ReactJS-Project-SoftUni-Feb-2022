import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import "./Header.css"
import mainLogo from "../../main-logo.png"
export const Header = () => {

    const { user } = useContext(AuthContext)

    const onClick = () => {

        document.getElementById("myDropdown").classList.toggle("show");

        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {
                const dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }

    return (


        <>
            <div className="col-md-2">
                <div className="main-logo">

                    <img src={mainLogo} alt="logo" />

                </div>
            </div>
            <div className="col-md-10">
                <nav id="navbar">
                    <div className="main-menu stellarnav">
                        <ul className="menu-list">

                            <li className="menu-item">
                                <Link to="/" data-effect="Articles" className="dropbtn">
                                    Home
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/about" data-effect="Articles" className="dropbtn">
                                    About
                                </Link>
                            </li>
                            <li className="dropdown">
                                <button onClick={onClick} className="dropbtn" style={{ height: '45px' }}>
                                    BOOKSTORE
                                </button>
                                <div id="myDropdown" className="dropdown-content">
                                    <Link to="/book-store">CATALOG</Link>
                                    <Link to="/most-liked">MOST LIKED</Link>
                                    {user.accessToken && <Link
                                        to="/addbook"
                                        className="nav-link"
                                        data-effect="Articles"
                                    >
                                        Add New Book
                                    </Link>}
                                </div>
                            </li>
                            {!user.accessToken

                                &&
                                <> <li className="menu-item">
                                    <Link
                                        to="/login"
                                        className="dropbtn"
                                        data-effect="Articles"

                                    >
                                        Login
                                    </Link>
                                </li>
                                    <li className="menu-item">
                                        <Link
                                            to="/register"
                                            className="dropbtn"
                                            data-effect="Articles"
                                        >
                                            Register
                                        </Link>
                                    </li></>
                            }



                            <li className="menu-item">
                                <Link
                                    to="/contact"
                                    className="dropbtn"
                                    data-effect="Contact"
                                >
                                    Contact
                                </Link>
                            </li>
                            {user.accessToken
                                &&
                                <>
                                    <li className="menu-item">
                                        <Link
                                            to="/logout"
                                            className="dropbtn"
                                            data-effect="Articles"
                                        >
                                            Logout
                                        </Link>
                                    </li>

                                    <span>Hello, <Link to='/profile' style={{textDecoration: 'none'}}> <strong>{user.first_name}</strong></Link></span> </>}

                        </ul>
                        <div className="hamburger">
                            <span className="bar" />
                            <span className="bar" />
                            <span className="bar" />
                        </div>
                    </div>
                </nav>
            </div>
        </>


    )
}