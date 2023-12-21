// homeTemplate.jsx
import React from 'react';

import image1 from "../../../style/images/logo.svg";
import image2 from "../../../style/images/nono.jpg"

import "./homeTemplate.scss"
import '../../../style/sass/_animations.scss';

const HomeTemplate = () => {
    return (
        <div className="slider-content">
            <h1>NONO LE ROBOT</h1>
            <div>jeu de programmation interactif</div>
            <div className="list-images">
                <img id="img1" className="rotatable" src={image1} alt="Image 1" />
                <img id="img2" className="rotatable" src={image2} alt="Image 2" />
            </div>

            {/* Ajoutez d'autres éléments au besoin */}
        </div>
    );
};

export default HomeTemplate;