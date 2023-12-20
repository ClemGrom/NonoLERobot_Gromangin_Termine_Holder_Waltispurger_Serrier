// components/atoms/LinkItem.js

import React from 'react';
import PropTypes from 'prop-types';

import './link-item.scss';

const LinkItem = ({ url, imageSrc }) => (
    <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={imageSrc} />
    </a>
);

LinkItem.propTypes = {
    url: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
};

export default LinkItem;
