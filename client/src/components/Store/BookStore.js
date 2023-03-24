import { BookList } from "./BookList"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"

    



  

export const BookStore = () => {

    const { books } = useContext(AuthContext)
    
    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="colored">
                                <h1 className="page-title">Catalog</h1>
                                <div className="breadcum-items">
                                    <span className="item">
                                        <Link to="/">Home /</Link>
                                    </span>
                                    <span className="item colored">Catalog</span>
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

                            {console.log(books)}
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