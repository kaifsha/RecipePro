import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import RecipeLogo from '../assets/RecipeLogo.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={RecipeLogo} alt="Ranna Logo" />
        </div>

        <div className="social-links">
          <a href="#" className="social-link">
            <FaFacebook className="social-icon" />
            <span>Facebook</span>
          </a>
          <a href="#" className="social-link">
            <FaTwitter className="social-icon" />
            <span>Twitter</span>
          </a>
          <a href="#" className="social-link">
            <FaInstagram className="social-icon" />
            <span>Instagram</span>
          </a>
          <a href="#" className="social-link">
            <FaYoutube className="social-icon" />
            <span>YouTube</span>
          </a>
        </div>

        <div className="copyright">
          © 2024 Moms Kitchen. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
