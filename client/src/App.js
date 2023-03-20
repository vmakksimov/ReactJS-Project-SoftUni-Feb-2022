
import './App.css';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { useState, useEffect } from 'react'
import { AuthContext } from './context/AuthContext';
import { Logout } from './components/Logout/Logout';
import { useLocalStorage } from './hooks/useLocalStorage';
import * as bookService from './services/bookService'
import { CreateBook } from './components/CreateBook/CreateBook';
import { BookStore } from './components/Store/BookStore';
import { BookDetails } from './components/BookDetails/BookDetails';
import { EditBook } from './components/EditBook/EditBook';
import { Profile } from './components/Profile/Profile';
import { BookReview } from './components/BookDetails/BookReview/BookReview';



function App() {

    const [user, setAuth] = useLocalStorage('auth', {})
    const [books, setBook] = useState([])

    useEffect(() => {
        bookService.getInitialBooks()
            .then(result => setBook(Object.values(result)))
    }, [])

    const deleteHandler = (bookId) => {
        if (bookId.length <= 1) {
            books.splice(Number(bookId) - 1, 1)
            setBook(books)
        }else{
            setBook(books.filter(x => x._id !== bookId))
        }
        
    }

    const userLogin = (authData) => {
        setAuth(authData)
    }

    const userLogout = () => {
        setAuth({})
    }

    const addBookHandler = (newBook) => {
        setBook(state => [
            ...state,
            newBook,
        ])
    }

    const editBookHandler = (bookId, booksData) => {
        setBook(state => state.map(x => x._id == bookId ? booksData : x))
    }



    return (
        <AuthContext.Provider value={{ user, books, userLogin, userLogout }}>

            <div className="App">
                <Header />
                {/*header-wrap*/}

                <main id='main'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/addbook' element={<CreateBook addBookHandler={addBookHandler} />} />
                        <Route path='/book-store' element={<BookStore />} />
                        <Route path='/book/review/:bookId' element={<BookReview />} />
                        <Route path='/book-details/:bookId' element={<BookDetails books={books} editBookHandler={editBookHandler} deleteHandler={deleteHandler} />} />
                        <Route path='/book-details/edit/:bookId' element={<EditBook books={books} editBookHandler={editBookHandler} />} />

                    </Routes>

                    <Footer />
                </main>
            </div>

        </AuthContext.Provider>
    );
}

export default App;
