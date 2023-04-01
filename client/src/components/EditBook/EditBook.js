import { useEffect, useState } from "react"
import * as bookService from '../../services/bookService'
import { useParams, useNavigate } from "react-router-dom"
import { validateUrl } from "../../Validation/RegisterValidation"


export const EditBook = ({ books, editBookHandler }) => {
    const currentDate = Date().split(' ')
    const yearDate = currentDate[3]
    const navigate = useNavigate();
    const [currentBook, setBook] = useState({});
    const { bookId } = useParams();
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        title: '',
        author: '',
        year: '',
        image: '',
        summary: '',
    });
    const current = books.find(x => x._id === Number(bookId))
    const firstId = Number(bookId) + 1
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

    }, []);

    const ChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const validationHandler = (e, bound) => {
        if (e.target.name == 'year') {
            if (isNaN(+e.target.value)) {
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            } else if (e.target.value.length < Number(bound) || e.target.value.length > Number(bound + 1)) {
                setErrors({
                    [e.target.name]: values[e.target.name]
                })

            } else if (Number(e.target.value) > Number(yearDate)) {
                setErrors({
                    [e.target.name]: values[e.target.name]
                })

            } else {
                setErrors({})
            }
        }
        if (e.target.name == 'image') {
            if (!validateUrl(e.target.value)) {
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            } else {
                setErrors({})
            }

        }
        if (e.target.name == 'summary') {
            if (e.target.value.length < Number(bound) || !isNaN(+e.target.value)) {
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            } else {
                setErrors({})
            }
        }

        if (e.target.name == 'title' || e.target.name == 'author') {
            if (e.target.value.length < Number(bound)) {
                setErrors({
                    [e.target.name]: values[e.target.name]
                })
            } else {
                setErrors({})
            }
        }
    }

    const onChange = (e) => {
        e.preventDefault()
        const booksData = Object.fromEntries(new FormData(e.target))
        const formData = new FormData(e.target)
        const title = formData.get('title')
        const author = formData.get('author')
        const year = formData.get('year')
        const summary = formData.get('summary')
        const cover = formData.get('image')
        const newBook = books.find(x => x._id == bookId)
        const final = { ...newBook, ...booksData }
        const objectId = Number(bookId) - 1

        // if (bookId.length <= 1){
        //     likedBook1 = { ...booksData, 'liked': current['liked'], 'total_likes': current['total_likes'], 'liked_by': current['liked_by'] }
        // }else{
        //     likedBook = { ...booksData, 'liked': currentBook['liked'], 'total_likes': currentBook['total_likes'], 'liked_by': currentBook['liked_by']}
        // }

        if (title.length < 2) {
            return;
        } else if (author.length < 2 || !isNaN(+author)) {
            return;
        } else if (isNaN(+year)) {
            return;
        } else if (year.length < 2 || year.length > 4) {
            return;
        } else if (Number(year) > Number(yearDate)) {
            return;
        } else if (summary.length < 60 || !isNaN(+summary)) {
            return;
        } else if (!validateUrl(cover)) {
            return;
        } else {

            if (bookId.length <= 1) {
                bookService.editInitial(objectId, final)
                    .then(res => {
                        editBookHandler(bookId, res)
                        navigate(`/book-details/${bookId}`)

                    })
            } else {
                bookService.editBooks(bookId, { ...booksData })
                    .then(res => {

                        editBookHandler(bookId, res)
                        navigate(`/book-details/${bookId}`)
                    })
            }

        }
    }
        return (
            <div className="container-register">
                <div className="title sign">Edit Book</div>

                <div className="content">
                    <form onSubmit={onChange}>
                        <div className="game-details">
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" name="title" placeholder="Enter title" values={values.title} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)} defaultValue={bookId.length <= 1 ? current.title : currentBook.title} />
                                {errors.title &&
                                    <p className="form-error" >
                                        The characters are shorter than 2!
                                    </p>
                                }
                            </div>
                            <div className="input-box">
                                <span className="details">Author</span>
                                <input type="text" name="author" placeholder="Enter Author" values={values.title} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)} defaultValue={bookId.length <= 1 ? current.author : currentBook.author} />
                                {errors.author &&
                                    <p className="form-error" >
                                        The characters are shorter than 2!
                                    </p>
                                }
                            </div>
                            <div className="input-box">
                                <span className="details">Year</span>
                                <input type="text" name="year" placeholder="Enter year" values={values.title} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 3)} defaultValue={bookId.length <= 1 ? current.year : currentBook.year} />
                                {errors.year &&
                                    <p className="form-error" >
                                        Only 3-4 digits allowed and up to current date!
                                    </p>
                                }
                            </div>
                            <div className="input-box">
                                <span className="details">Image</span>
                                <input type="text" name="image" placeholder="Enter Image Url" values={values.title} onChange={ChangeHandler} onBlur={(e) => validationHandler(e)} defaultValue={bookId.length <= 1 ? current.image : currentBook.image} />
                                {errors.image &&
                                    <p className="form-error" >
                                        URL is not valid!
                                    </p>
                                }
                            </div>
                            <div className="input-box">
                                <span className="details">Summary</span>
                                <input type="text" name="summary" placeholder="Summary" values={values.summary} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 60)} defaultValue={bookId.length <= 1 ? current.summary : currentBook.summary} />
                                {errors.summary &&
                                    <p className="form-error" >
                                        The characters must be equal or greater than 60!
                                        Only digits are not allowed!
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="button-book">
                            <input type="submit" value="Edit Book" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }