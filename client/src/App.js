import './styles/css/style.css'
import './styles/css/normalize.css'
import './styles/css/vendor.css'
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Routes, Route} from 'react-router-dom';
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
import { Error404 } from './components/Error/404';
import { BookContext } from './context/BookContext';
import { PrivateGuard } from './components/guards/PrivateGuard';
import { BookOwner } from './components/guards/PrivateId';

function App() {

    const [user, setAuth] = useLocalStorage('auth', {})
    const [books, setBook] = useState([])
    const [likes, setLike] = useState([])
    const [users, setUsers] = useState([])

    const addUsersHandler = (usersData) => {
        setUsers(state => [
            ...state,
            usersData,
        ])
    }

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
        } else {
            setBook(books.filter(x => x._id !== bookId))
        }
    }

    const deleteLikeHandler = (newId) => {
        setLike(likes.filter(x => x._id !== newId))
    }

    const editProfile = (authData) => {
        setAuth({ ...user, ...authData })
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
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <AuthContext.Provider value={{ user, likes, users, isAuthenticated: !!user.accessToken, userLogin, userLogout, addUsersHandler }}>

            <div className="App">
                <div id="header-wrap">
                    <header id="header">
                        <div className="container">
                            <div className="row">
                            <Header />
                            </div>
                        </div>
                    </header>
                </div>

                {/*header-wrap*/}
                <BookContext.Provider value={{ books, likes, addLikeHandler, editLikeHandler, editBookHandler, deleteHandler, deleteLikeHandler }}>
                    <main id='main'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route element={<PrivateGuard />}>
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/profile/edit' element={<EditProfile />} />
                                <Route path='/addbook' element={<CreateBook addBookHandler={addBookHandler} />} />
                            </Route>
                            <Route element={<BookOwner />}>
                                <Route path='/book-details/edit/:bookId' element={<EditBook />} />
                            </Route>
                            <Route path='/book-details/:bookId' element={<BookDetails likess={likes} />} />
                            <Route path='/book-store' element={<BookStore />} />
                            <Route path='/most-liked' element={<MostLiked />} />
                            <Route path='/404' element={<Error404 />} />
                        </Routes>
                        <Footer />
                    </main>
                </BookContext.Provider>
            </div>

        </AuthContext.Provider>
    );
}

export default App;
