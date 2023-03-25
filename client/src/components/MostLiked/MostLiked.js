import './MostLiked.css'
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { MostLikedItem } from './MostLikedItem'

export const MostLiked = () => {

    const { books } = useContext(AuthContext)
    
    
    let sortedProducts = books.sort((p1, p2) => (p1.total_likes < p2.total_likes) ? 1 : (p1.total_likes > p2.total_likes) ? -1 : 0);
    

    
    return (
        <div className="table-container">
    
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Likes</th>
                        <th>Reviews</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr></tr>
                </tfoot>
                <tbody>

                    {sortedProducts.length > 0 && sortedProducts.map((x, index) => <MostLikedItem key={x._id} book={x} index={index +1}/>)}
                    
                </tbody>
            </table>
           
        </div>
    )
}