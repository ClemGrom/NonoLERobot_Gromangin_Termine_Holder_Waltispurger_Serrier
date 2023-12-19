import logo from './style/images/logo.svg';
import './style/sass/_global.scss'
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link className="App-link" to="/">Home</Link>
                </li>
                <li>
                  <Link className="App-link" to="/about">About</Link>
                </li>
                <li>
                  <Link className="App-link" to="/users">Users</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
