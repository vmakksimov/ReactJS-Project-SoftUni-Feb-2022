import { useEffect, useState } from "react"
import * as bookService from '../../../services/bookService'
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { AuthContext } from "../../../context/AuthContext"
import { useContext } from "react"
import uniqid from 'uniqid';

export const BookReview = ({ editBookHandler }) => {


    const { user, books } = useContext(AuthContext)

    const navigate = useNavigate()

    const [currentBook, setBook] = useState({});
    const [errors, setError] = useState({
        message: ''
    });

    const { bookId } = useParams();

    const current = books.find(x => x._id === Number(bookId))
    const newBook = books.find(x => x._id == bookId)
    // const likedByUser = newBook.liked_by.includes(user._id)



    const style = {

    }

    style.fontSize = '30px'
    style.padding = '10px'
    style.content = "\f08a";

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

    const userExists = () => {
        const errorMessage = 'You have already left a review for this book.'

        setError(state => ({
            ...state,
            message: errorMessage

        }))

    }

    const onSubmitReview = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const review = formData.get('review')
        const userInReview = newBook.reviews.map(x => Object.keys(x).toString() == user.username)


        const reviewedBookData = {}

        if (!(reviewedBookData.hasOwnProperty(user.username))) {
            reviewedBookData[user.username] = [review,]
            reviewedBookData['_id'] = uniqid()
        } else {
            reviewedBookData[user.username].push(review)
        }

        if (newBook.reviews.length > 0) {
            newBook.reviews.push(reviewedBookData)
        } else {
            newBook.reviews = []
            newBook.reviews.push(reviewedBookData)
        }

        console.log('liked book below')


        const objectId = Number(bookId) - 1

        if (bookId.length <= 1) {
            bookService.editInitial(objectId, newBook)
                .then(res => {
                    editBookHandler(bookId, res)
                    navigate(`/book-details/${bookId}`)

                })
        } else {
            bookService.editBooks(bookId, newBook)
                .then(res => {
                    editBookHandler(bookId, res)
                    navigate(`/book-details/${bookId}`)
                })
        }




    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-title" style={{ fontSize: '26px' }}>
                                {bookId.length <= 1
                                    ? <div><h1>{current.author}</h1>
                                        <p>{current.title}</p></div>


                                    : <div><h1>{currentBook.author}</h1>
                                        <p>{currentBook.title}</p></div>
                                }
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="padding-large">
                <div className="container" style={{ width: '50%' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <section className="comment-respond  mb-5">
                                <h3>Leave a Review</h3>
                                <form className="form-group mt-3" onSubmit={onSubmitReview}>
                                    <div className="row">

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <textarea
                                                className="u-full-width"
                                                id="comment"
                                                name="review"
                                                placeholder="Write your review here"
                                                rows={20}
                                                defaultValue={""}
                                            />
                                        </div>
                                        {/* <div className="col-md-12">
                                            <label className="example-send-yourself-copy">
                                                <input type="checkbox" />
                                                <span className="label-body">
                                                    Save my name, email, and website in this browser for the
                                                    next time I leave a review.
                                                </span>
                                            </label>
                                        </div> */}
                                        <div className="col-md-12">
                                            <input
                                                className="btn btn-rounded btn-large btn-full"
                                                type="submit"
                                                defaultValue="Submit"
                                            />
                                        </div>
                                        {errors.message &&
                                            <div style={{ color: 'red' }}>{errors.message}</div>}
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}