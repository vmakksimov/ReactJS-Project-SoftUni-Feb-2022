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
        image: ''

    })

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
                        <span className="details">Image</span>
                        <input type="text" name="image" placeholder="Enter Image Url" value={values.image} onChange={onChange} required />
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