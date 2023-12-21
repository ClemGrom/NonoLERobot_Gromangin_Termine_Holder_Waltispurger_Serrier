import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Home.scss';
import '../../style/sass/_animations.scss';

import HomeTemplate from '../../components/templates/home/homeTemplate';

const Home = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div id="home-container">
            <div className="upper-div">
                <Slider {...settings}>
                    <div className="slide">
                        <div className="content-left">
                            <p>home</p>
                            <HomeTemplate />
                        </div>
                    </div>
                    <div className="slide">
                        <div className="content-left">
                            <p>presentation</p>
                            <HomeTemplate />
                        </div>
                    </div>
                    <div className="slide">
                        <div className="content-left">
                            <p>tutoriel</p>
                            <HomeTemplate />
                        </div>
                    </div>
                    <div className="slide">
                        <div className="content-left">
                            <p>Qui sommes-nous</p>
                            <HomeTemplate />
                        </div>
                    </div>
                    <div className="slide">
                        <div className="content-left">
                            <p>Jouer</p>
                            <HomeTemplate />
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Home;
