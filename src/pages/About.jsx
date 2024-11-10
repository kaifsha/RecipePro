




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
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
    <div className="about-page">
      <div className="page-content">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <div className="about-container">
          <div className="about-content"></div>
          <div className="about-section">
            <div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt magnam, esse assumenda voluptatem laborum laudantium, consectetur aliquid nemo facere officiis aspernatur earum harum? Cumque, ipsum labore. Alias qui, reprehenderit a, quia debitis explicabo inventore mollitia sit accusamus voluptates unde.</p>
            </div>
            <div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt magnam, esse assumenda voluptatem laborum laudantium, consectetur aliquid nemo facere officiis aspernatur earum harum? Cumque, ipsum labore. Alias qui, reprehenderit a, quia debitis explicabo inventore mollitia sit accusamus voluptates unde.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
