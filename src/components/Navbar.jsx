// 

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import RecipeLogo from '../assets/RecipeLogo.png';

const Navbar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    console.log('Searching for:', searchQuery);
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={RecipeLogo} alt="Logo" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="navbar-search">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearchSubmit}
        />
      </div>
    </nav>
  );
};

export default Navbar;
