import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setMenuAberto(!menuAberto)}>
        ☰
      </div>

      {menuAberto && (
        <nav className="menu-lateral">
          <Link to="/" onClick={() => setMenuAberto(false)}>Tabela</Link>
          <Link to="/video1" onClick={() => setMenuAberto(false)}>Vídeo 1</Link>
          <Link to="/video2" onClick={() => setMenuAberto(false)}>Vídeo 2</Link>
        </nav>
      )}
    </>
  );
}

export default Navbar;
