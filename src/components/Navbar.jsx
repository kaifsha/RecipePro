// // 

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import RecipeLogo from '../assets/RecipeLogo.png';

// const Navbar = ({ searchQuery, setSearchQuery, handleSearch }) => {
//   const navigate = useNavigate();

//   const handleSearchSubmit = () => {
//     console.log('Searching for:', searchQuery);
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${searchQuery}`);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">
//           <img src={RecipeLogo} alt="Logo" />
//         </Link>
//       </div>

//       <ul className="navbar-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>

//       <div className="navbar-search">
//         <SearchBar
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           handleSearch={handleSearchSubmit}
//         />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './SearchBar';
import RecipeLogo from '../assets/RecipeLogo.png';

const Navbar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={RecipeLogo} alt="Logo" />
        </Link>
      </div>

      {/* Hamburger Button */}
      <button 
        className="hamburger-btn"
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <div className={`nav-content ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>

        <div className="navbar-search">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearchSubmit}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
