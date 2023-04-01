
import "./CreateBook.css"
import { useState, useContext } from "react"
import * as BookService from '../../services/bookService'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { validateUrl } from "../../Validation/RegisterValidation"

export const CreateBook = ({ addBookHandler }) => {
    const currentDate = Date().split(' ')
    const year = currentDate[3]
    const { books } = useContext(AuthContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({

        title: '',
        author: '',
        year: '',
        image: '',
        summary: '',


    });

    const ChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const validationHandler = (e, bound) => {
        let bookExists = books.map(x => x.title == e.target.value)
   
        if (e.target.name == 'title') {
            if (bookExists.includes(true)){
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            }else if (e.target.value.length < Number(bound)){
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            
            }else{
                setErrors({})   
            }
        }
        if (e.target.name == 'year') {
            console.log(Number(e.target.value) > Number(year))
            if (isNaN(+e.target.value)){
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            }else if(e.target.value.length < Number(bound) || e.target.value.length > Number(bound + 1)){
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
                
            }else if (Number(e.target.value) > Number(year)){
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
                
            }else{
                setErrors({})
            }
            // }
           
        }
        if (e.target.name == 'author'){
           if (e.target.value.length < Number(bound) || !isNaN(+e.target.value)){
            setErrors({
                [e.target.name]: values[e.target.name]
            })
           }else{
            setErrors({})
           }
        }  
        if (e.target.name == 'summary'){
            if (e.target.value.length < Number(bound) || !isNaN(+e.target.value)){
             setErrors({
                 [e.target.name]: values[e.target.name]
             })
            }else{
             setErrors({})
            }
         }
         if (e.target.name == 'image'){
            let coverExists = books.map(x => x.image == e.target.value)
            console.log(coverExists)
            if (coverExists.includes(true)){
                console.log('heree')
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            }else{
                if (!validateUrl(e.target.value)){
                    setErrors({
                        [e.target.name]: values[e.target.name]
                    })
                   }else{
                    setErrors({})
                   }
            }
            
         }        
    }

    // const [values, setValues] = useState('',{
    //     title: '',
    //     author: '',
    //     year: '',
    //     image: '',
    //     summary: '',

    // })

    // const array = new Array()
    // const number = Number(0)

    // const onChange = (e) => {

    //     setValues(e.target.value)
    // }

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
                            <input type="text" name="title" placeholder="Enter title" values={values.title} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)}  required />
                            {errors.title &&
                                <p className="form-error" >
                                    The book already exists or the characters are shorter than 2!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details">Author</span>
                            <input type="text" name="author" placeholder="Enter Author" values={values.author} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)}  required />
                            {errors.author &&
                                <p className="form-error" >
                                    The author name must longer than 1 character! Digits are not allowed!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details">Year</span>
                            <input type="text" name="year" placeholder="Enter year" values={values.year} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 3)}  required />
                            {errors.year &&
                                <p className="form-error" >
                                    Only 3-4 digits allowed and up to current date!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details">Summary</span>
                            <input type="text" name="summary" placeholder="Type summary" values={values.summary} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 60)}  required />
                            {errors.summary &&
                                <p className="form-error" >
                                    The characters must be equal or greater than 60!
                                    Only digits are not allowed!
                                </p>
                            }
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
                            <input type="text" name="image" placeholder="Enter Image Url" values={values.image} onChange={ChangeHandler} onBlur={(e) => validationHandler(e)} required />
                            {errors.image &&
                                <p className="form-error" >
                                    URL is not valid or already exists!
                                </p>
                            }
                        </div>
                        <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="liked" defaultValue={false} />
                        </div>
                        <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="total_likes" value={0} />
                        </div>
                        <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="liked_by" defaultValue={['default', 'default']} />
                        </div>
                        <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="reviews" defaultValue={[]} />
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