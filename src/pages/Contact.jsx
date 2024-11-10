import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {

  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchMealDetails();
  }, [mealId]);


  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError('Please enter an ingredient to search');
      setMeals([]);
      return;
    }
  
    setError('');
    try {
      // First try to get from categories for better images
      const categoryResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
      const ingredientResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
      
      let responseData;
      if (categoryResponse.data.meals) {
        responseData = categoryResponse.data.meals;
      } else if (ingredientResponse.data.meals) {
        responseData = ingredientResponse.data.meals;
      }
  
      if (responseData) {
        // Get full meal details for better quality images
        const detailedMeal = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${responseData[0].idMeal}`);
        responseData[0] = detailedMeal.data.meals[0];
        
        setMeals(responseData);
      } else {
        setMeals([]);
        setError('No data found for this ingredient');
      }
    } catch (err) {
      console.log('Search error:', err);
      setError('An error occurred while fetching data');
    }
  };

  if (!meal) return <p>Loading...</p>;
  return (
    <div className="contact-page">
      <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      <div className="contact-container">
      <div className="contact-content"></div>
        <div className="contact-contents">
          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className='contact-btn'>Send Message</button>
            </form>
          </div>
          
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>info@recipeplatform.com</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>+1 234 567 8900</p>
            </div>
            <div className="info-item">
              <i className="fas fa-location-dot"></i>
              <p>123 Recipe Street, Foodville, FC 12345</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
