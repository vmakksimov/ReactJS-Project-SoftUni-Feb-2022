import './Footer.css'

export const Footer = () => {
    return (

        <footer id="footer">
            <div id="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p>
                                            © 2023 All rights reserved. ReactJS Project SoftUni

                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="social-links align-right">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <i className="icon icon-facebook" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="icon icon-twitter" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="icon icon-youtube-play" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="icon icon-behance-square" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*grid*/}
                        </div>
                        {/*footer-bottom-content*/}
                    </div>
                </div>
            </div>

        </footer>


    )
}