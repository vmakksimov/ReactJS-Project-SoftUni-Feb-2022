import "./Profile.css"

export const Profile = () => {
    return (
        <div className="team">
            <div className="container">
                <div className="row inf-content">
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s" >
                        <div className="team-item">
                            <div className="team-img">
                                <img src={"./img/team-1.jpg"} alt="Person Image" />
                            </div>
                            <div className="team-text">
                                <h2>{"Default User"}</h2>
                                <p>Yoga {"User"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 user-info">
                        <strong>Information</strong>
                        <br />
                        <div className="table-responsive">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-bookmark text-primary"></span>
                                                Username
                                            </strong>
                                        </td>
                                        <td className="text-primary">{"Yoga User"}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-calendar text-primary"></span>
                                                Full Name
                                            </strong>
                                        </td>
                                        <td className="text-primary">{"Default User"}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-eye-open text-primary"></span>
                                                Role
                                            </strong>
                                        </td>
                                        <td className="text-primary">Yoga {"User"}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-envelope text-primary"></span>
                                                Email
                                            </strong>
                                        </td>
                                        <td className="text-primary">{"No email provided"}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div
                    className="section-header text-center wow zoomIn"
                    data-wow-delay="0.1s"
                >
                    <p> 's Classes </p>

                    <h2>{"Classes you teach"}</h2>
                </div>
            </div>

            <div className="class">
                <div className="container">
                    <div className="row class-container">
                        {'user clasess'}
                    </div>
                </div>
            </div>


        </div>
    )
}