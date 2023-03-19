import { useEffect, useState } from "react"
import * as bookService from '../../services/bookService'
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from './BookDetails.module.css'
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import Heart from 'react-heart'


export const BookDetails = ({ books, editBookHandler }) => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();


    const [currentBook, setBook] = useState({});
    const [active, setActive] = useState(false)

    const { bookId } = useParams();

    const current = books.find(x => x._id === Number(bookId))
    const newBook = books.find(x => x._id == bookId)

    console.log(newBook)


    const style = {

    }

    style.fontSize = '30px'
    style.padding = '10px'
    style.content = "\f08a";


    const onLike = (e) => {
        // setActive(!active)
        // if (newBook.liked === false) {
        //     setActive(!active)
        //     newBook.liked = true
        //     newBook.total_likes += 1
         
        //     console.log('liked')
        //     console.log(newBook)
          
        // } else if (newBook.liked === true) {
        //     setActive(active)
        //     newBook.liked = false
        //     if (newBook.total_likes >= 1) {
        //         newBook.total_likes -= 1
        //     }
        //     console.log('not liked')
        //     console.log(newBook)
            
        // }

       



        const filledHeart = "fa fa-heart"
        const nonFilledHeart = "fa fa-heart-o"




        if (e.target.className == nonFilledHeart) {
            console.log('not liked')
            e.target.className = filledHeart
            newBook.total_likes += 1
            newBook.liked = true
         
        } else if (e.target.className = filledHeart) {
            e.target.className = nonFilledHeart
            console.log('liked')
            newBook.total_likes -= 1
            newBook.liked = false
          
        }




        console.log(newBook)
        const objectId = Number(bookId) - 1

        const likedBook = { 'liked': newBook['liked'], 'total_likes': newBook['total_likes'] }
        console.log(likedBook)



        if (bookId.length <= 1) {
            bookService.editInitial(objectId, newBook)
                .then(res => {
                    editBookHandler(bookId, res)
                    
                })
        } else {
            bookService.editBooks(bookId, likedBook)
                .then(res => {
                    editBookHandler(bookId, res)

                })
        }

    }

    const firstId = Number(bookId) + 1
    const finalStr = firstId.toString()

    useEffect(() => {
        if (bookId.length <= 1) {
            bookService.getFromStore(finalStr)
                .then(res => {
                    setBook(res)
                })
        } else {
            bookService.getFromData(bookId)
                .then(res => {
                    setBook(res)
                })
        }

    }, [])

    return (
        <section className="bg-sand padding-large">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <figure className="products-thumb">

                            {bookId.length <= 1
                                ? <img
                                    src={current.image}

                                    alt="book"
                                    className="single-image"
                                />
                                : <img
                                    src={currentBook.image}

                                    alt="book"
                                    className="single-image"
                                />
                            }

                        </figure>

                    </div>
                    <div className="col-md-6 pl-5">
                        <div className="product-detail">

                            {bookId.length <= 1
                                ? <div><h1>{current.title}</h1>
                                    <p>{current.author}</p></div>


                                : <div><h1>{currentBook.title}</h1>
                                    <p>{currentBook.author}</p></div>

                            }



                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                                anim id est laborum.

                            </p>
                         
                                <Link to=""><i className={newBook.liked ? "fa fa-heart" : "fa fa-heart-o"} id="heart" style={style} aria-hidden="true" onClick={onLike}></i></Link>

                            {bookId.length <= 1
                                ? <div><span>Total Likes:{current.total_likes}</span></div>
                                : <div><span>Total Likes:{currentBook.total_likes}</span></div>
                            }



                        </div>
                    </div>
                    <div>
                        {bookId.length <= 1
                            ? user.email == current._ownerEmail ? <div>  <Link to={`/book-details/edit/${bookId}`} type="button">Edit</Link> <button>Leave a Review</button> </div> : <button>Leave a Review</button>
                            : user._id == currentBook._ownerId ? <div> <Link to={`/book-details/edit/${bookId}`} className="button">Edit</Link> <button>Leave a Review</button> </div> : <button>Leave a Review</button>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}