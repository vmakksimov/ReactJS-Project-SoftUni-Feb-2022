import './MostLiked.css'
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { MostLikedItem } from './MostLikedItem'

export const MostLiked = () => {

    const { likes} = useContext(AuthContext)

    console.log('likes below')
    console.log(likes)
    
    let sortedProducts = likes.sort((p1, p2) => (p1.total_likes < p2.total_likes) ? 1 : (p1.total_likes > p2.total_likes) ? -1 : 0);
    let isLiked = sortedProducts.filter(x => x.liked ? true: false)
    
    
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

                    {isLiked.length > 0 ?isLiked.slice(0,5).map((x, index) => <MostLikedItem key={x._id} like={x} index={index +1}/>) : <span>There are no liked books.</span>}
                  
                </tbody>
            </table>
           
        </div>
    )
}