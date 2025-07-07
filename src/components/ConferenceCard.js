import React from 'react';

const ConferenceCard = ({ name, date }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
    <h3>{name || 'Conference Name'}</h3>
    <p>{date || 'Date TBD'}</p>
  </div>
);

export default ConferenceCard; 