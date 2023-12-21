// components/atoms/LinkItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import './link-item.scss';

const LinkItem = ({ url, imageSrc, alt }) => (
    <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={imageSrc} alt={alt}/>
    </a>
);

LinkItem.propTypes = {
    url: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default LinkItem;
