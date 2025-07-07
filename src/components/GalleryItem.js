import React from 'react';

const GalleryItem = ({ src, alt }) => (
  <div style={{ display: 'inline-block', margin: '1rem' }}>
    <img src={src || 'https://via.placeholder.com/150'} alt={alt || 'Gallery Item'} style={{ width: 150, height: 150 }} />
  </div>
);

export default GalleryItem; 