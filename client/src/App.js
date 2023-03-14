
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


function App() {

    const [user, setAuth] = useLocalStorage('auth' ,{})
    const [books, setBook] = useState([])

    const userLogin = (authData) => {
        setAuth(authData)
    }

    const userLogout = () => {
        setAuth({})
    }

    useEffect(() => {
        bookService.getBooks()
            .then(result => setBook(Object.values(result)))
    })

    return (
        <AuthContext.Provider value={{user, userLogin, userLogout}}>

            <div className="App">
                <Header />
                {/*header-wrap*/}

                <main id='main'>
                    <Routes>
                        <Route path='/' element={<Home books={books} />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />

                    </Routes>

                    <Footer />
                </main>
            </div>

        </AuthContext.Provider>
    );
}

export default App;
