
import "./CreateBook.css"
import { useState } from "react"
import * as BookService from '../../services/bookService'
import { useNavigate } from "react-router-dom"

export const CreateBook = ({addBookHandler}) => {

    const navigate = useNavigate()

    const [values, setValues] = useState('',{
        title: '',
        author: '',
        year: '',
        image: '',
        summary: '',

    })

    const array = new Array()
    const number = Number(0)

    const onChange = (e) => {
      
        setValues(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        
        const booksData = Object.fromEntries(new FormData(e.target))
        BookService.create(booksData)
            .then(res => {
                addBookHandler(res)
                navigate('/book-store')
            })


    }

    return (
        <div className="container-register">
        <div className="title sign">Add Book</div>
       
        <div className="content">
            <form onSubmit={onSubmit}>
                <div className="game-details">
                    <div className="input-box">
                        <span className="details">Title</span>
                        <input type="text" name="title" placeholder="Enter title" value={values.title} onChange={onChange} required />
                    </div>
                    <div className="input-box">
                        <span className="details">Author</span>
                        <input type="text" name="author" placeholder="Enter Author" value={values.author} onChange={onChange} required />
                    </div>
                    <div className="input-box">
                        <span className="details">Year</span>
                        <input type="text" name="year" placeholder="Enter year" value={values.year} onChange={onChange} required />
                    </div>
                    <div className="input-box">
                        <span className="details">Summary</span>
                        <input type="text" name="summary" placeholder="Type summary" value={values.summary} onChange={onChange} required />
                    </div>
                    <div className="input-box">
                            <span className="details">Genre</span>
                            <select name="genre">
                                <option value="business">Business</option>
                                <option value="horror">Horror</option>
                                <option value="fictional">Fictional</option>
                                <option value="romantic">Romantic</option>
                                <option value="adventure">Adventure</option>
                            </select>
                        </div>
                    <div className="input-box">
                        <span className="details">Image</span>
                        <input type="text" name="image" placeholder="Enter Image Url" value={values.image} onChange={onChange} required />
                    </div>
                    <div className="input-box">
                        <span className="details"></span>
                        <input type="hidden" name="liked" defaultValue={false} />
                    </div>
                    <div className="input-box">
                        <span className="details"></span>
                        <input type="hidden" name="total_likes" value={0}/>
                    </div>
                    <div className="input-box">
                        <span className="details"></span>
                        <input type="hidden" name="liked_by" defaultValue={['default', 'default']}/>
                    </div>
                    <div className="input-box">
                        <span className="details"></span>
                        <input type="hidden" name="reviews" defaultValue={[]}/>
                    </div>
                </div>

                <div className="button-book">
                    <input type="submit" value="Add Book" />
                </div>
            </form>
        </div>
    </div>

    )
}