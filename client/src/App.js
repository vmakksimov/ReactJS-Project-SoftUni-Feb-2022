
import './App.css';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';


function App() {
    return (

        <div className="App">
            <Header />
            {/*header-wrap*/}

            <main id='main'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />

                </Routes>

                <Footer />
            </main>
        </div>


    );
}

export default App;
