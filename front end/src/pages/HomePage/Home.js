// Home.js

import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div id="menu">
                <button className="logo">
                    <img src="images/nono.jpg" alt="NONO LE ROBOT" />
                </button>
                <button className="newgame">NOUVELLE PARTIE</button>
                <button className="loadgame">CHARGER PARTIE</button>
                <button className="options">OPTIONS</button>
                <button className="qsn">QUI SOMMES-NOUS ?</button>
            </div>
        );
    }
}

export default Home;