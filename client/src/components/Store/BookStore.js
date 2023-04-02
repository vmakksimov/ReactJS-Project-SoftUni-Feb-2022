import { BookList } from "./BookList"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useState } from "react"
import { BookContext } from "../../context/BookContext"
import './BookStore.css'

export const BookStore = () => {

    const { books } = useContext(BookContext)
    const [current, setBook] = useState({
      
    });

    const onGenre = (e) => {
        e.preventDefault()
        const genre = books.filter(x => x.genre == e.target.id)
        setBook(genre)

    }

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
            <ul className="tabs">
                <li data-tab-target="#all-genre" className="active tab" id="all" onClick={onGenre}>
                    All Genre
                </li>
                <li data-tab-target="#business" className="tab" id="business" onClick={onGenre}>
                    Business
                </li>
                <li data-tab-target="#technology" className="tab" id="horror" onClick={onGenre}>
                    Horror
                </li>
                <li data-tab-target="#romantic" className="tab" id="fictional" onClick={onGenre}>
                    Fictional
                </li>
                <li data-tab-target="#adventure" className="tab" id="romantic" onClick={onGenre}>
                    Romantic
                </li>
                <li data-tab-target="#fictional" className="tab" id="adventure" onClick={onGenre}>
                    Adventure
                </li>
            </ul>
            <section className="padding-large">
                <div className="container">
                    <div className="row">
                        <div className="products-grid grid">

                            {current 
                            ? current.length > 0
                                ? current.map(x => <BookList key={x._id} book={x} />)

                                : books.length > 0 ? books.map(x => <BookList key={x._id} book={x} />) : <span>No books in the catalog.</span>

                            
                            : <span>Please, register</span>
                        
                        }
                         
                            
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}