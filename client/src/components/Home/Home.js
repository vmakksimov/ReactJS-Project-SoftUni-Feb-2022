import { BookItem } from "./BookItem/BookItem"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { useState } from "react"


export const Home = () => {


    const { books } = useContext(AuthContext)
    const [current, setBook] = useState({});

    // const firstOne = books.find(x => x._id == 1)

    const onLike = (e) => {
        e.preventDefault()

    }

    const onGenre = (e) => {
        e.preventDefault()
        const genre = books.filter(x => x.genre == e.target.id)
        setBook(genre)

    }


    return (
        <>
            <section id="best-selling" className="leaf-pattern-overlay">
                <div className="corner-pattern-overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <figure className="products-thumb">
                                        <img
                                            src='images/it.jpg'

                                            alt="book"
                                            className="single-image"
                                        />
                                        <a href=""><i className="fa fa-heart-o" aria-hidden="true" onClick={onLike}></i></a>
                                    </figure>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-entry">
                                        <h2 className="section-title divider">Best Selling Book</h2>
                                        <div className="products-content">
                                            <div className="author-name">By Stephen King</div>
                                            <h3 className="item-title">IT</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                eu feugiat amet, libero ipsum enim pharetra hac.
                                            </p>

                                            <div className="btn-wrap">
                                                <a href="#" className="btn-accent-arrow">
                                                    shop it now <i className="icon icon-ns-arrow-right" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* / row */}
                        </div>
                    </div>
                </div>
            </section>
            <section id="popular-books" className="bookshelf">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-header align-center">
                                <div className="title">
                                    <span>Some quality items</span>
                                </div>
                                <h2 className="section-title">Popular Books</h2>
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
                            <div className="tab-content">
                                <div id="all-genre" data-tab-content="" className="active">
                                    <div className="row">

                                        {/* {books.length > 0 

                                       
                                        ?books.slice(1, 5).map(x => <BookItem key={x._id} book={x} />)
                                        
                                        : <span>No current books added.</span>
                                        } */}
                                        {console.log(current)}

                                        {current.length > 0
                                            ? current.map(x => <BookItem key={x._id} book={x} />)
                                            : books.slice(4).map(x => <BookItem key={x._id} book={x} />)
                                        }

                                    </div>
                                </div>




                            </div>
                        </div>
                        {/*inner-tabs*/}
                    </div>
                </div>
            </section>
            <section id="quotation" className="align-center">
                <div className="inner-content">
                    <h2 className="section-title divider">Quote of the day</h2>
                    <blockquote>
                        <q>
                            “The more that you read, the more things you will know. The more that
                            you learn, the more places you’ll go.”
                        </q>
                        <div className="author-name">Dr. Seuss</div>
                    </blockquote>
                </div>
            </section>
        </>
    )
}