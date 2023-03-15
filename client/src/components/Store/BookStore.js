import { BookList } from "./BookList"
import { Link } from "react-router-dom"

export const BookStore = ({ books }) => {
    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="colored">
                                <h1 className="page-title">Shop</h1>
                                <div className="breadcum-items">
                                    <span className="item">
                                        <Link to="/">Home /</Link>
                                    </span>
                                    <span className="item colored">Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="padding-large">
                <div className="container">
                    <div className="row">
                        <div className="products-grid grid">
                            {books.length > 0 &&

                                 books.map(x => <BookList key={x._id} book={x} />)
                               
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}