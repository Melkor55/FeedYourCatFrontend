// src/components/FeedingScheduleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Typography, Box } from '@mui/material';
import image1 from '../assets/pic1.webp';
import image2 from '../assets/pic2.jpg';

const FeedingScheduleList = () => {
  const [feedingSchedules, setFeedingSchedules] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER + '/api/feeding-schedules')
      .then(response => setFeedingSchedules(response.data))
      .catch(error => console.error('Error fetching feeding schedules:', error));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Feeding Schedule List
      </Typography>
      <Stack spacing={2} sx={{ marginBottom: 2 }}>
        <img src={image1} alt="Feeding Schedule 1" style={{ width: '800px' }} />
        <img src={image2} alt="Feeding Schedule 2" style={{ width: '800px' }} />
      </Stack>
      <ul>
        {feedingSchedules.map(schedule => (
          <li key={schedule.id}>{schedule.time} - {schedule.quantity}</li>
        ))}
      </ul>
    </Box>
  );
};

export default FeedingScheduleList;
