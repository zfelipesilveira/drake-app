// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import TopTracks from './TopTracks';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Register />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/top-tracks/:username" element={<TopTracks />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;