import { BookItem } from "./BookItem/BookItem"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { Link} from "react-router-dom"
import { BookContext } from "../../context/BookContext"
import IT from '../../830502.jpg'
import './Home.css'


export const Home = () => {
    const { likes } = useContext(AuthContext)
    const { books } = useContext(BookContext)
    let sortedProducts = likes.sort((p1, p2) => (p1.total_likes < p2.total_likes) ? 1 : (p1.total_likes > p2.total_likes) ? -1 : 0);
    let isLiked;
    if (sortedProducts.length > 0){
        isLiked = books.filter(x => x.title == sortedProducts[0].title)
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
                                        {isLiked
                                        ? <img
                                        src={isLiked[0].image}

                                        alt="book"
                                        className="single-image"
                                    />
                                    : <img
                                    src={IT}

                                    alt="book"
                                    className="single-image"
                                />
                                        }
                                       
                                        
                                    </figure>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-entry">
                                        <h2 className="section-title divider">Most Popular Book</h2>
                                        <div className="products-content">
                                            <div className="author-name">By {isLiked ? isLiked[0].author : 'Stephen King'}</div>
                                            <h3 className="item-title">{isLiked ? isLiked[0].title : 'IT'}</h3>
                                            <p>
                                            {isLiked ? isLiked[0].summary : 'The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey. `It` primarily appears in the form of Pennywise the Dancing Clown to attract its preferred prey of young children.'}
                                            </p>

                                            <div className="btn-wrap">
                                                {books.length > 0}
                                                <Link to='/book-details/1' className="btn-accent-arrow">
                                                    See More <i className="icon icon-ns-arrow-right" />
                                                </Link>
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
                                <h2 className="section-title">Recently added</h2>
                            </div>
                            
                            <div className="tab-content">
                                <div id="all-genre" data-tab-content="" className="active">
                                    <div className="row">

                                        {books.length <= 5 

                                       
                                        ? books.length > 0 ? books.slice(1, 5).map(x => <BookItem key={x._id} book={x} />) : <span>No books added.</span>
                                        
                                        :books.slice(5,).map(x => <BookItem key={x._id} book={x} />)
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