import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onClick, url }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={() => onClick(url, alt)}>
      <img src={src} alt={alt} className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
