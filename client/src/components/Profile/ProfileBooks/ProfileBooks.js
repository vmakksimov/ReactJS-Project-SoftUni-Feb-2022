import "./ProfileBooks.css"

export const ProfileBooks = ({book}) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp" data-wow-delay="0.0s">
            <div className="class-wrap">
                <div className="class-img">
                    <img src={book.image} alt="Class Image" />
                </div>
                <div className="class-text">

                    {book.author}

                    <h2>{book.title}</h2>
                    <div className="class-meta">
                        <p><i className="far fa-calendar-alt"></i>{book.likes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}