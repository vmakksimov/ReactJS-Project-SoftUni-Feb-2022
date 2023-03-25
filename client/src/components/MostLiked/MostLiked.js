import './MostLiked.css'
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { MostLikedItem } from './MostLikedItem'

export const MostLiked = () => {

    const { books } = useContext(AuthContext)
    
    return (
        <div className="container-register">
    
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr></tr>
                </tfoot>
                <tbody>

                    {books.length > 0 && books.map((x, index) => <MostLikedItem key={x._id} book={x} index={index +1}/>)}
                    
                </tbody>
            </table>
           
        </div>
    )
}