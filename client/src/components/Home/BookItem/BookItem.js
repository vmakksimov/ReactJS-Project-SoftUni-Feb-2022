import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const BookItem = ({book}) => {

    const navigate = useNavigate();

    const onClick = (e) => {
        e.preventDefault()
        navigate(`/book-details/${book._id}`)
    }
    
    return (
        <div className="col-md-3">
            <figure className="product-style">
                <img
                    src={book.image}
                    alt="Books"
                    className="product-item"
                />
                <button
                    type="button"
                    className="add-to-cart"
                    data-product-tile="add-to-cart"
                    onClick={onClick}
                >
                    Details
                </button>
                <figcaption>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                </figcaption>
            </figure>
        </div>
    )
}