import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import "./Header.css"
import mainLogo from "../../main-logo.png"
export const Header = () => {

    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const menuBtn = document.querySelector('.menu-btn');
        const container = document.getElementById('container');

        const handleMenuToggle = () => {
            document.body.classList.toggle('pushy-open-right');
            if (container) {
                container.classList.toggle('push');
            }
        };

        menuBtn?.addEventListener('click', handleMenuToggle);

        return () => {
            menuBtn?.removeEventListener('click', handleMenuToggle);
        };
    }, []);

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
                <div className="container-side">
                    <button class="menu-btn"><i class="fa fa-navicon"></i></button>
                    <nav class="pushy pushy-right" data-focus="#first-link">
                        <div class="pushy-content">
                            <ul>
                                <li className="dropbtn"><Link to="/" data-effect="Articles">HOME</Link></li>
                                <li className="dropbtn"><Link to="/about" data-effect="Articles">
                                    ABOUT
                                </Link></li>
                                {!user.accessToken

                                    &&
                                    <> <li className="dropbtn">
                                        <Link to="/login" data-effect="Articles">
                                            LOGIN
                                        </Link>
                                    </li>
                                        <li className="dropbtn">
                                            <Link to="/register" data-effect="Articles">
                                                REGISTER
                                            </Link>
                                        </li></>
                                }

                                {user.accessToken
                                    &&
                                    <>
                                        <li className="dropbtn">
                                            <Link
                                                to="/logout"
                                                data-effect="Articles"
                                            >
                                                LOGOUT
                                            </Link>
                                        </li></>}
                                <li class="pushy-link"><Link
                                    to="/contact"
                                    data-effect="Contact"
                                >
                                    CONTACT
                                </Link></li>
                                {/* Pushy Submenu */}
                                <li className={`pushy-submenu ${isOpen ? 'pushy-submenu-open' : 'pushy-submenu-closed'}`}>
                                    <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>BOOKSTORE</button>
                                    <ul>
                                        <li class="dropbtn"><Link to="/book-store">CATALOG</Link></li>
                                        <li class="dropbtn"><Link to="/most-liked">MOST LIKED</Link></li>
                                        {user.accessToken && <>
                                            <li class="dropbtn"><Link to="/addbook" data-effect="Articles"> ADD NEW BOOK</Link></li></>}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
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

                                    <span>Hello, <Link to='/profile' style={{ textDecoration: 'none' }}> <strong>{user.first_name}</strong></Link></span> </>}

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