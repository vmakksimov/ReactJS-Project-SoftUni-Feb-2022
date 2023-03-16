import { useEffect, useState } from "react"
import * as bookService from '../../services/bookService'
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export const BookDetails = ({ books }) => {

    const [currentBook, setBook] = useState({});

    const { bookId } = useParams();

    const current = books.find(x => x._id === Number(bookId))

    console.log(books)

    console.log(bookId)


    console.log(current)

   
    const firstId = Number(bookId) + 1
    const finalStr = firstId.toString()
    useEffect(() => {
        if (bookId.length <= 1 ){
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
                            ?<img
                            src={current.image}

                            alt="book"
                            className="single-image"
                        />
                        :<img
                        src={currentBook.image}

                        alt="book"
                        className="single-image"
                    />
                        }
                            
                            <Link to=""><i className="fa fa-heart-o" aria-hidden="true"></i></Link>
                        </figure>

                    </div>
                    <div className="col-md-6 pl-5">
                        <div className="product-detail">

                            {bookId.length <= 1
                            ?<h1>{current.title}</h1>
                           

                            :<h1>{currentBook.title}</h1>
                           
                        }   
                        {bookId.length <= 1
                        ? <p>{current.author}</p>
                        :<p>{currentBook.author}</p>
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
                            <button
                                type="submit"
                                name="add-to-cart"
                                value={27545}
                                className="button"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}