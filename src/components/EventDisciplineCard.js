import React from 'react';

const EventDisciplineCard = ({ discipline }) => (
  <div style={{ border: '1px solid #aaa', padding: '1rem', margin: '1rem' }}>
    <h4>{discipline || 'Discipline Name'}</h4>
  </div>
);

export default EventDisciplineCard; 