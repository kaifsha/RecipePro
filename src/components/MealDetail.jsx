import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const MealDetail = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div>
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      
      <div className="search-hero">
        <div className="hero-image-container">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="hero-image"
          />
          <h1 className="hero-title">{meal.strMeal}</h1>
        </div>
      </div>

      <div className="popular-categories">
        <h2 className="categories-title">Most Popular Dish Detil</h2>
        <p className="categories-subtitle">
          Enjoy these amazing recipes!
        </p>
      </div>
  
      <div className='meal-main-section'>
      <div className="meal-details">
        <img src={meal.strMealThumb} alt={meal.strMeal} className='detail-img' />
        <div className='sub-section'>
          <h2>{meal.strMeal}</h2>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
      </div>
    </div>
  );
  
};

export default MealDetail;
