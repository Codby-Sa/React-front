import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Video1 from './pages/Video1';
import Video2 from './pages/Video2';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video1" element={<Video1 />} />
        <Route path="/video2" element={<Video2 />} />
      </Routes>
    </Router>
  );
}

export default App;
