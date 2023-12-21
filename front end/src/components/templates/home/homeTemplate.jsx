// homeTemplate.jsx
import React from 'react';

import image1 from "../../../style/images/logo.svg";

const HomeTemplate = () => {
    return (
        <div className="slider-content">
            <h1>NONO LE ROBOT</h1>
            <img src={image1} alt="Image 1" />
            <img src={image1} alt="Image 2" />
            {/* Ajoutez d'autres éléments au besoin */}
        </div>
    );
};

export default HomeTemplate;