import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/video1">Vídeo 1</Link>
        <Link to="/video2">Vídeo 2</Link>
        <Link to="/config">Configurações</Link>
      </div>
    </nav>
  );
}

export default Navbar;
