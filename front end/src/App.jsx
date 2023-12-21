// App.jsx
import './style/sass/main.scss'
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Play from './pages/PlayPage/Play';
import HeaderBar from './components/organisms/header-bar';

function App() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const [color, changeColor] = useState("#282c34");

    return (

        <div className="App" style={{ background: color }}>
            <Router>
                <HeaderBar
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    navigation={(
                        <nav id="navigation">
                            <div>Menu</div>
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
                                            <Link className="App-link" to="/" onClick={() => changeColor("#282c34")}>
                                                Home
                                            </Link>
                                        </li>
                                        <li className="menu-transition-enter">
                                            <Link className="App-link" to="/play" onClick={() => changeColor("#282828")}>
                                                Play
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
                    <Route path="/play" element={<Play />} />
                    {/* Ajoutez d'autres routes ici */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
