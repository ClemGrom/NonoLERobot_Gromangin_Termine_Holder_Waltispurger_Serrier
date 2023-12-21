// Home.jsx

import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Home.scss';

import slide1 from '../../style/images/logo.svg';

import HomeTemplate from "../../components/templates/home/homeTemplate";

class Home extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: true, // Affiche les points verticalement
            verticalSwiping: true, // Permet le défilement vertical
        };

        return (
            <div id="home-container">
                <div className="upper-div">
                    <Slider {...settings}>
                        <div>
                            home
                            <HomeTemplate />
                        </div>
                        <div>
                            presentation
                            <HomeTemplate />
                        </div>
                        <div>
                            tutoriel
                            <HomeTemplate />
                        </div>
                        <div>
                            Qui sommes-nous
                            <HomeTemplate />
                        </div>
                        <div>
                            Jouer
                            <HomeTemplate />
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Home;