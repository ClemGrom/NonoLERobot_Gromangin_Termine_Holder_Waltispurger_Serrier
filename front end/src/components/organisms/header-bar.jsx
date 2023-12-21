// components/organisms/header-bar.jsx
import React, { useState } from 'react';
import './header-bar.scss';
import LinkList from '../../components/molecules/link-list';
import insta from '../../style/images/instagram.png';

const links = [
    {
        url: 'https://fr.legacy.reactjs.org/',
        imageSrc: insta,
        alt: '',
    },
    {
        url: 'https://www.example2.com',
        imageSrc: insta,
        alt: '',
    },
    {
        url: 'https://www.example2.com',
        imageSrc: insta,
        alt: '',
    },
];

const HeaderBar = ({ isMenuOpen, toggleMenu, navigation }) => {
    return (
        <div className="header-bar">
            <div id="title">NONO LE ROBOT</div>
            <div id="links-list">
                <LinkList links={links} />
            </div>
            {navigation}
        </div>
    );
};

export default HeaderBar;