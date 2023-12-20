import logo from './style/images/logo.svg';
import './style/sass/main.scss'
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";

function App() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

  return (
      <div className="App">
          <Router>
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
                                  <Link className="App-link" to="/">Home</Link>
                              </li>
                              <li className="menu-transition-enter">
                                  <Link className="App-link" to="/about">About</Link>
                              </li>
                          </>
                      )}
                  </ul>
              </nav>

              <Routes>
                {/* Le contenu spécifique à la route Home */}
                <Route path="/" element={<Home />} />

                {/* Le contenu spécifique à la route About */}
                <Route path="/about" element={<About />} />
              </Routes>
          </Router>
      </div>
  );
}
export default App;
