// src/components/FeedingScheduleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedingScheduleList = () => {
  const [feedingSchedules, setFeedingSchedules] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER+'/api/feeding-schedules')
      .then(response => setFeedingSchedules(response.data))
      .catch(error => console.error('Error fetching feeding schedules:', error));
  }, []);

  return (
    <div>
      <h1>Feeding Schedule List</h1>
      <ul>
        {feedingSchedules.map(schedule => (
          <li key={schedule.id}>{schedule.time} - {schedule.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeedingScheduleList;
