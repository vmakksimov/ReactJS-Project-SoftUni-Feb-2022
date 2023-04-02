import { useEffect, useState } from "react"
import * as bookService from '../../services/bookService'
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from './BookDetails.module.css'
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { Reviews } from "./BookReview/Reviews"
import { SubmitReview } from "./BookReview/LeaveReview"
import { Liked } from "./BookReview/Liked"
import { BookContext } from "../../context/BookContext"
import uniqid from 'uniqid';
import "./BookDetails.css"

export const BookDetails = ({ likess }) => {

  
    

    const { user } = useContext(AuthContext)
    const { books, addLikeHandler, editLikeHandler, deleteHandler, deleteLikeHandler } = useContext(BookContext)
    const navigate = useNavigate()
    const [currentBook, setBook] = useState({});
    const [isActive, setReview] = useState(false);
    const [likes, setLikes] = useState();
    const [day, setDate] = useState([])
    const { bookId } = useParams();

    
    const firstId = Number(bookId) - 1
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


    const current = books.find(x => x._id === Number(bookId))
    const newBook = books.find(x => x._id == bookId)
    // const isReviewed = likes.filter(x => console.log(x))
    // console.log(likes)
    const dateHandler = () => {
        setDate([])
    }

    let currentLikedBook = likess.find(x => x.book_id == bookId ? x : false)
    let likedByUser;
    let likesObject;
    let likeId;


    if (currentLikedBook) {
        likedByUser = currentLikedBook.user_liked.includes(user._id) ? true : false
    } else {
        if (newBook != undefined){
            likesObject = { "user_liked": [], 'book_id': bookId, "total_likes": 0, "liked": false, "reviews": [], "title": newBook['title'], "image": newBook['image'] }
            likedByUser = false
        }
        
    }
    const style = {}

    style.fontSize = '30px'
    style.padding = '10px'


    const onLike = (e) => {
        e.preventDefault()

        const filledHeart = "fa fa-heart"
        const nonFilledHeart = "fa fa-heart-o"

        Liked(e, filledHeart, nonFilledHeart, user, likedByUser, currentLikedBook, likeId, likesObject, deleteLikeHandler)

        if (!currentLikedBook) {
            bookService.like(likesObject)
                .then(res => {
                    setLikes(res)
                    addLikeHandler(res)
                })
        } else {
            likeId = currentLikedBook._id
            bookService.likeUpdate(likeId, currentLikedBook)
                .then(res => {
                    setLikes(res)
                    editLikeHandler(likeId, res)
                })
        }


    }

    const onSubmitReview = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const review = formData.get('review')
        // const userInReview = newBook.reviews.map(x => Object.keys(x).toString() == user.username)
        const clearFiled = document.getElementById('comment')

        // SubmitReview(review, user, newBook, bookId, clearFiled)

        const reviewedBookData = {}

        if (!(reviewedBookData.hasOwnProperty(user.username))) {
            reviewedBookData[user.username] = [review,]
            reviewedBookData['_id'] = uniqid()
        } else {
            reviewedBookData[user.username].push(review)
        }

        if (currentLikedBook) {
            likeId = currentLikedBook._id
            currentLikedBook.reviews.push(reviewedBookData)
            bookService.likeUpdate(likeId, currentLikedBook)
                .then(res => {
                    setLikes(res)
                    editLikeHandler(likeId, res)
                })
        } else {

            currentLikedBook = { "user_liked": [], 'book_id': bookId, "total_likes": 0, "liked": false, "reviews": [], "title": newBook['title'], "image": newBook['image'] }
            currentLikedBook.reviews.push(reviewedBookData)
            bookService.like(currentLikedBook)
                .then(res => {
                    setLikes(res)
                    addLikeHandler(res)
                })
        }

        clearFiled.value = ''
        const currentDate = Date().split(' ')

        const month = currentDate[1].toString()
        const date = currentDate[2].toString()
        const year = currentDate[3].toString()
        const hour = currentDate[4].toString()

        const final = {
            month: month,
            date: date,
            year: year,
            hour: hour,
        }

        setDate(state => [
            ...state,
            final,
        ])



    }

    const onDeleteHandler = () => {

        const objectId = Number(bookId) - 1
        const confirmation = window.confirm('Are you sure you want to delete this book?')

        if (confirmation) {
            if (currentLikedBook) {
                let newId = currentLikedBook._id
                bookService.removeLiked(newId)
                deleteLikeHandler(newId)
            }

            if (bookId.length <= 1) {
                bookService.removeInitialBook(objectId)

            } else {
                bookService.removeBook(bookId)

            }

            deleteHandler(bookId)
            navigate('/')
        }

    }

    const onReview = (e) => {
        e.preventDefault();
        if (isActive) {
            setReview(false)
        } else {
            setReview(true)
        }

    }

    

   

    return (
        <section className="bg-sand padding-large">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <figure className="products-thumb">

                            {bookId.length <= 1 && current
                                ? <img
                                    src={current.image}

                                    alt="book"
                                    className="single-image"
                                    style={{ width: '56%' }}
                                />
                                : <img
                                    src={currentBook.image}

                                    alt="book"
                                    className="single-image"
                                    style={{ width: '56%' }}
                                />
                            }

                        </figure>

                    </div>
                    <div className="col-md-6 pl-5">
                        <div className="product-detail">

                            {bookId.length <= 1 && current
                                ? <div><h1>{current.title}</h1>
                                    <p>{current.author}</p>

                                    <p>
                                        {current.summary}
                                    </p>
                                </div>

                                : <div><h1>{currentBook.title}</h1>
                                    <p>{currentBook.author}</p>

                                    <p>
                                        {currentBook.summary}
                                    </p>

                                </div>

                            }

                            {user.accessToken && <Link to=""><i className={likedByUser ? "fa fa-heart" : "fa fa-heart-o"} id="heart" style={style} aria-hidden="true" onClick={onLike}></i></Link>}

                            {currentLikedBook
                                ? <div><span>Likes: {currentLikedBook.total_likes}</span></div>
                                : <div><span>Likes: 0</span></div>
                            }

                            {/* {bookId.length <= 1
                                ? <div><span>Total Likes: {current.total_likes}</span></div>
                                : user._id !== currentBook._ownerId ? <div><span>Total Likes: {likes.total_likes}</span></div> : <div><span>Total Likes: {currentBook.total_likes}</span></div>

                            } */}
                            <div>
                                {bookId.length <= 1 && current
                                    ? user.email == current._ownerEmail ? <div>  <Link to={`/book-details/edit/${bookId}`} className="buttonEdit" style={{ padding: '20px 29px' }}>Edit</Link> <button onClick={onDeleteHandler} className="buttonEdit" style={{ padding: '31px 29px' }}>Delete</button> <button onClick={onReview} className="buttonEdit" style={{ padding: '31px 29px' }}>Leave a Review</button> </div> : user.accessToken ? <button onClick={onReview} className="buttonEdit" style={{ padding: '31px 29px' }}>Leave a Review</button> : <Link to='/register'><span>Register here so you can like and comment.</span></Link>
                                    : user._id == currentBook._ownerId ? <div> <Link to={`/book-details/edit/${bookId}`} className="buttonEdit" style={{ padding: '20px 29px' }}>Edit</Link> <button onClick={onDeleteHandler} className="buttonEdit" style={{ padding: '31px 29px' }}>Delete</button> <button onClick={onReview} className="buttonEdit" style={{ padding: '31px 29px' }}>Leave a Review</button> </div> : user.accessToken ? <button onClick={onReview} className="buttonEdit" style={{ padding: '31px 29px' }}>Leave a Review</button> : <Link to='/register'><span>Register here so you can like and comment.</span></Link>
                                }

                                {isActive && <form className="form-group mt-3" onSubmit={onSubmitReview} style={{ width: '50%', display: 'flex', justifyContent: 'center', marginTop: '5px', marginLeft: '25%' }}>

                                    <div className="row" >
                                        <div className="col-md-12">
                                            <textarea
                                                className="u-full-width"
                                                id="comment"
                                                name="review"
                                                placeholder="Write your review here"
                                                rows={20}
                                                defaultValue={""}
                                                style={{ marginTop: '20px' }}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <input
                                                className="btn btn-rounded btn-large btn-full"
                                                type="submit"
                                                defaultValue="Submit"
                                                style={{ borderRadius: '25px' }}

                                            />
                                        </div>

                                    </div>
                                </form>}

                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <section className="comments-wrap mb-4">
                <h3>Reviews</h3>
                <div className="comment-list mt-4">
                    {/* {key={Object.keys(x)}} */}

                    {currentLikedBook ?
                        currentLikedBook.reviews.map(x => <Reviews key={x._id} book={x} user={user} day={day} dateHandler={dateHandler} />)
                        : <span>No Reviews</span>
                    }
                    {/* {likes['reviews']
                    ? currentLikedBook.reviews.map(x => <Reviews key={x._id} book={x} />)
                    : !isActive && <span>No Reviews</span>} */}


                    {/*flex-container*/}

                    {/*child-comments*/}
                </div>
                {/*comment-list*/}
            </section>
        </section>

    )
}