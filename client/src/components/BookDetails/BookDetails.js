import { useEffect, useState } from "react"
import * as bookService from '../../services/bookService'
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from './BookDetails.module.css'
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"


export const BookDetails = ({ books }) => {

    const { user } = useContext(AuthContext)

    const [currentBook, setBook] = useState({});

    const { bookId } = useParams();

    const current = books.find(x => x._id === Number(bookId))


    const style = {

    }

    style.fontSize = '30px'
    style.padding = '10px'

    
    const onLike = (e) => {
        e.preventDefault()
     
       const filledHeart = "fa fa-heart"
       const nonFilledHeart = "fa fa-heart-o"

        if (e.target.className !== filledHeart){
            e.target.className = filledHeart
        }else{
            e.target.className = nonFilledHeart
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
                            <span style={style}>Like
                                <Link to=""><i className="fa fa-heart-o" id="heart" style={style} aria-hidden="true" onClick={onLike}></i></Link>
                            </span>

                            <div>
                                <span>Total Likes:</span>
                            </div>

                        </div>
                    </div>
                    <div>
                        {bookId.length <= 1
                            ? user.email == current._ownerEmail ? <div> <button>Edit</button> <button>Leave a Review</button> </div> : <button>Leave a Review</button>
                            : user._id == currentBook._ownerId ? <div> <button>Edit</button> <button>Leave a Review</button> </div> : <button>Leave a Review</button>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}