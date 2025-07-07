import React from 'react';

const SectionHeader = ({ title, subtitle }) => (
  <div style={{ margin: '2rem 0' }}>
    <h2>{title || 'Section Title'}</h2>
    <p>{subtitle || 'Section subtitle goes here.'}</p>
  </div>
);

export default SectionHeader; 