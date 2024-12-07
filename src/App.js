// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CatList from './components/CatList';
import FoodList from './components/FoodList';
import FoodGridView from './components/FoodGridView';
import FeedingScheduleList from './components/FeedingScheduleList';
import ProductDetailPage from './components/ProductDetailPage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/cats">Cats</a></li>
            <li><a href="/foods">Foods</a></li>
            <li><a href="/feeding-schedules">Feeding Schedules</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/cats" element={<CatList />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/feeding-schedules" element={<FeedingScheduleList />} />
          <Route path="/foods/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
