import React from 'react';

const SpeakerCard = ({ name, topic }) => (
  <div style={{ border: '1px solid #bbb', padding: '1rem', margin: '1rem' }}>
    <strong>{name || 'Speaker Name'}</strong>
    <div>{topic || 'Topic'}</div>
  </div>
);

export default SpeakerCard; 