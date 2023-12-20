// Home.jsx

import React, { Component } from 'react';
import LinkList from "../../components/molecules/link-list";

import './Home.scss';

import nono from '../../style/images/nono.jpg'
import insta from '../../style/images/instagram.png'

class Home extends Component {
    render() {
        const links = [
            {
                url: 'https://fr.legacy.reactjs.org/',
                imageSrc: insta,
            },
            {
                url: 'https://www.example2.com',
                imageSrc: insta,
            },
            {
                url: 'https://www.example2.com',
                imageSrc: insta,
            }
        ];

        return (
            <div id="home-content">
                <div id="menu">
                    <button className="logo">
                        <img id="nono-logo" src={nono} />
                        NONO LE ROBOT
                    </button>
                    <button className="newgame">NOUVELLE PARTIE</button>
                    <button className="loadgame">CHARGER PARTIE</button>
                    <button className="options">OPTIONS</button>
                    <button className="qsn">QUI SOMMES-NOUS ?</button>
                </div>

                <div id="links-list">
                    <LinkList links={links} />
                </div>
            </div>
        );
    }
}

export default Home;