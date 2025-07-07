import React from 'react';

const ScheduleItem = ({ time, activity }) => (
  <div style={{ margin: '1rem 0' }}>
    <span>{time || '00:00'}</span> - <span>{activity || 'Activity'}</span>
  </div>
);

export default ScheduleItem; 