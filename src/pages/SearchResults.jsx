import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MealCard from '../components/MealCard';
import MealDetailModal from '../components/MealDetailModal';

const SearchResults = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError('Please enter an ingredient to search');
      setMeals([]);
      return;
    }

    setError('');
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
      if (response.data.meals) {
        setMeals(response.data.meals);
        console.log('Search Results:', {
          query: query,
          totalResults: response.data.meals.length,
          meals: response.data.meals.map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            thumbnail: meal.strMealThumb
          }))
        });
      } else {
        setMeals([]);
        console.log('No results found for:', query);
        setError('No data found for this ingredient');
      }
    } catch (err) {
      console.log('Search error:', err);
      setError('An error occurred while fetching data');
    }
};


  const handleMealClick = async (mealId) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      setSelectedMeal(response.data.meals[0]);
    } catch (error) {
      console.error('Failed to fetch meal details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="search-results">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={() => handleSearch(searchQuery)}
      />
      {error && <p className="error">{error}</p>}
      <div className="meals-container">
        {meals.map((meal) => (
          <MealCard 
            key={meal.idMeal} 
            meal={meal} 
            onClick={() => handleMealClick(meal.idMeal)} 
          />
        ))}
      </div>
      {selectedMeal && (
        <MealDetailModal meal={selectedMeal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SearchResults;
