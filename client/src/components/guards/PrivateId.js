import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'
import { Outlet, useParams, useNavigate, Navigate } from "react-router-dom";
import { BookContext } from '../../context/BookContext';



export const BookOwner = ({ children }) => {

    const { bookId } = useParams();
    const navigate = useNavigate()

    const { user, isAuthenticated } = useContext(AuthContext)
    const { books } = useContext(BookContext)

    let selectId =  books.find(x => x._id === bookId) 
    let selectEmail=  books.find(x => x.email === user._ownerEmail)
    const currentId = selectId

    console.log(bookId)
    console.log(user.email)
    console.log(selectEmail)
 

    if (bookId.length <= 1 && selectEmail){
        if (!isAuthenticated || user.email !== selectEmail._ownerEmail) {
            return <Navigate to='/' replace/>
        }
    }else if (currentId){
        if (!isAuthenticated || user._id !== currentId._ownerId) {
            return <Navigate to='/' replace/>
        }
    }
    


    return children ? children : <Outlet />

}