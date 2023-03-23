import "./ProfileBooks.css"
import { Link } from "react-router-dom"

export const ProfileBooks = ({book}) => {
    return (
        <Link to={`/book-details/${book._id}`}>
        <div className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp" data-wow-delay="0.0s">
            <div className="class-wrap">
                <div className="class-img">
                    <img src={book.image} alt="Class Image" />
                </div>
                <div className="class-text">

                    {book.author}

                    <h2>{book.title}</h2>

                    <p>Total likes: {book.total_likes}</p>
                   
                </div>
            </div>
        </div>
        </Link>
    )
}