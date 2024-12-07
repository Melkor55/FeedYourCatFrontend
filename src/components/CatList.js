// src/components/CatList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatList = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER+'/api/cats')
      .then(response => setCats(response.data))
      .catch(error => console.error('Error fetching cats:', error));
  }, []);

  return (
    <div>
      <h1>Cat List</h1>
      <ul>
        {cats.map(cat => (
          <li key={cat.id}>{cat.name} - {cat.age} - {cat.breed}</li>
        ))}
      </ul>
    </div>
  );
};

export default CatList;
