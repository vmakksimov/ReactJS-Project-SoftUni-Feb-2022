import { Link } from "react-router-dom"
export const MostLikedItem = ({ book, index }) => {
    return (
       <tr>

            <td data-title="Provider Name"> {index}</td>

            <td data-title="Provider Name">
                <a href="">

                </a>
                <Link to={`/book-details/${book._id}`} style={{textDecoration: 'none'}}>
                {book.title}
                </Link>
            </td>
            <td data-title="E-mail"> <Link to={`/book-details/${book._id}`} style={{textDecoration: 'none'}}> <img src={book.image} alt="Books" className="product-item" style={{width: '25%'}}/></Link></td>
            <td className="select" style={{fontSize: '20px'}}>
                <p >
                    <i className="fa fa-heart" aria-hidden="true" /> {book.total_likes}
                </p>
              </td>
              <td className="select" style={{fontSize: '20px'}}>  
              <p>
                    <i className="fa fa-commenting" aria-hidden="true"></i> {book.reviews.length}
                </p>
            </td>
        </tr>

    )
}