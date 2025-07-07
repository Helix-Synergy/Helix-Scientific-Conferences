import React from 'react';

const FormInput = ({ label, ...props }) => (
  <div style={{ margin: '1rem 0' }}>
    <label>
      {label || 'Label'}
      <input {...props} style={{ marginLeft: '0.5rem' }} />
    </label>
  </div>
);

export default FormInput; 