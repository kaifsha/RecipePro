import React from 'react';
import Navbar from '../components/Navbar';

const Services = () => {
  return (
    <div className="services-page">
      <Navbar />
      <div className="services-container">
        <h1>Our Services</h1>
        <div className="services-grid">
          <div className="service-card">
            <h3>Recipe Search</h3>
            <p>Find recipes based on ingredients you have</p>
          </div>
          
          <div className="service-card">
            <h3>Meal Planning</h3>
            <p>Plan your weekly meals with our suggestions</p>
          </div>
          
          <div className="service-card">
            <h3>Cooking Tips</h3>
            <p>Expert cooking advice and techniques</p>
          </div>
          
          <div className="service-card">
            <h3>Dietary Guides</h3>
            <p>Recipes filtered by dietary requirements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
