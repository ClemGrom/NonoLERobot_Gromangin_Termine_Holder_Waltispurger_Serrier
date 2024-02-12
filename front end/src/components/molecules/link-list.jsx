// components/molecules/LinkList.js

import React from 'react';
import PropTypes from 'prop-types';
import LinkItem from '../atoms/link-item';

const LinkList = ({ links }) => (
  <div className="link-list">
    {links.map((link, index) => (
      <LinkItem
        key={index}
        url={link.url}
        imageSrc={link.imageSrc}
      />
    ))}
  </div>
);

LinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LinkList;