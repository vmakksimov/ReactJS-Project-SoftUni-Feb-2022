export const BookItem = ({book}) => {
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
                >
                    Add to Cart
                </button>
                <figcaption>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                </figcaption>
            </figure>
        </div>
    )
}