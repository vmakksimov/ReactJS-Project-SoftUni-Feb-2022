import { useEffect, useState } from "react"
import * as bookService from '../../../services/bookService'
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { AuthContext } from "../../../context/AuthContext"
import { useContext } from "react"

export const BookReview = () => {


    const { user, books } = useContext(AuthContext)

    const navigate = useNavigate()

    const [currentBook, setBook] = useState({});

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

    return (
        <>
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

                                {bookId.length <= 1
                                    ? <div><span>Total Likes: {current.total_likes}</span></div>
                                    : <div><span>Total Likes: {currentBook.total_likes}</span></div>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-title">
                                Leave A Review Below
                            </h1>

                        </div>
                    </div>
                </div>
            </section>
            <section className="padding-large">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <section className="comment-respond  mb-5">
                                <h3>Leave a Review</h3>
                                <form method="post" className="form-group mt-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                className="u-full-width"
                                                type="text"
                                                name="author"
                                                id="author"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                className="u-full-width"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="E-mail Address"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <textarea
                                                className="u-full-width"
                                                id="comment"
                                                name="comment"
                                                placeholder="Write your review here"
                                                rows={20}
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="example-send-yourself-copy">
                                                <input type="checkbox" />
                                                <span className="label-body">
                                                    Save my name, email, and website in this browser for the
                                                    next time I comment.
                                                </span>
                                            </label>
                                        </div>
                                        <div className="col-md-12">
                                            <input
                                                className="btn btn-rounded btn-large btn-full"
                                                type="submit"
                                                defaultValue="Submit"
                                            />
                                        </div>
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