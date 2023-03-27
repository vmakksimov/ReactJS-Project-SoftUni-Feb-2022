
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
import { EditProfile } from './components/Profile/ProfileBooks/EditProfile/EditProfile';
import { MostLiked } from './components/MostLiked/MostLiked';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';




function App() {

    const [user, setAuth] = useLocalStorage('auth', {})
    const [books, setBook] = useState([])
    const [likes, setLike] = useState([])

    const addLikeHandler = (newLike) => {
        setLike(state => [
            ...state,
            newLike,
        ])
    }

    const editLikeHandler = (likeId, currentLikedBook) => {
        setBook(state => state.map(x => x._id == likeId ? currentLikedBook : x))
    }

    const deleteHandler = (bookId) => {
        if (bookId.length <= 1) {
            books.splice(Number(bookId) - 1, 1)
            setBook(books)
        }else{
            setBook(books.filter(x => x._id !== bookId))
        }
        
    }

    const editProfile = (authData) => {
        setAuth({...user, ...authData})
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

    useEffect(() => {
        bookService.getInitialBooks()
            .then(result => setBook(Object.values(result)))
    }, [])

    return (
        <AuthContext.Provider value={{ user, books, likes, userLogin, userLogout, editProfile, addLikeHandler, editLikeHandler }}>

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
                        <Route path='/about' element={<About />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/profile/edit' element={<EditProfile />} />
                        <Route path='/addbook' element={<CreateBook addBookHandler={addBookHandler} />} />
                        <Route path='/book-store' element={<BookStore />} />
                        <Route path='/most-liked' element={<MostLiked />} />
                        {/* <Route path='/book/review/:bookId' element={<BookReview editBookHandler={editBookHandler}/>} /> */}
                        <Route path='/book-details/:bookId' element={<BookDetails books={books} editBookHandler={editBookHandler} deleteHandler={deleteHandler} likess={likes} />} />
                        <Route path='/book-details/edit/:bookId' element={<EditBook books={books} editBookHandler={editBookHandler} />} />

                    </Routes>

                    <Footer />
                </main>
            </div>

        </AuthContext.Provider>
    );
}

export default App;
