import { useNavigate } from "react-router-dom"

export const BookList = ({book}) => {

    const navigate = useNavigate();

    const onClick = (e) => {
        e.preventDefault()
        console.log(book)
        navigate(`/book-details/${book._id}`)
    }
    return (
        <figure className="product-style">
            <img
                src={book.image}
                alt="Books"
                className="product-item"
            />
            <button onClick={onClick}
                type="button"
                className="add-to-cart"
                data-product-tile="add-to-cart"
            >
                Details
            </button>
            <figcaption>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                
            </figcaption>
        </figure>
    )
}


