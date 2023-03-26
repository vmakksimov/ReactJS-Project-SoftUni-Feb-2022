import { Link } from "react-router-dom"
export const MostLikedItem = ({ like, index }) => {

 

    return (
       <tr>

            <td data-title="Provider Name"> {index}</td>

            <td data-title="Provider Name">
                <a href="">

                </a>
                <Link to={`/book-details/${like.book_id}`} style={{textDecoration: 'none'}}>
                {like.title}
                </Link>
            </td>
            <td data-title="E-mail"> <Link to={`/book-details/${like.book_id}`} style={{textDecoration: 'none'}}> <img src={like.image} alt="Books" className="product-item" style={{width: '25%'}}/></Link></td>
            <td className="select" style={{fontSize: '20px'}}>
                <p >
                    <i className="fa fa-heart" aria-hidden="true" /> {like.total_likes}
                </p>
              </td>
              <td className="select" style={{fontSize: '20px'}}>  
              <p>
                    <i className="fa fa-commenting" aria-hidden="true"></i> {like.reviews.length}
                </p>
            </td>
        </tr>

    )
}