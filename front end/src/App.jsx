// App.jsx
import './style/sass/main.scss'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import HeaderBar from './components/organisms/header-bar';

function App() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="App">
            <Router>
                {/* Le HeaderBar reste en dehors de Routes */}
                <HeaderBar
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    navigation={(
                        <nav id="navigation">
                            <p>Menu</p>
                            <div id="menu-icon" onClick={toggleMenu}>
                                &#9776;
                            </div>
                            <ul
                                className={`menu-transition ${
                                    isMenuOpen
                                        ? 'show-menu menu-transition-enter-active'
                                        : 'menu-transition-leave-active'
                                }`}
                            >
                                {isMenuOpen && (
                                    <>
                                        <li className="menu-transition-enter">
                                            <Link className="App-link" to="/">
                                                Home
                                            </Link>
                                        </li>
                                        {/* Ajoutez d'autres liens ici */}
                                    </>
                                )}
                            </ul>
                        </nav>
                    )}
                />

                <Routes>
                    {/* Le contenu spécifique à la route Home */}
                    <Route path="/" element={<Home />} />
                    {/* Ajoutez d'autres routes ici */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
