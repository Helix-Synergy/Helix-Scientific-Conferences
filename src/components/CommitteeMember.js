import React from 'react';

const CommitteeMember = ({ name, role }) => (
  <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem' }}>
    <strong>{name || 'Member Name'}</strong>
    <div>{role || 'Role'}</div>
  </div>
);

export default CommitteeMember; 