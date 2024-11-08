import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MealDetail = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);

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

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="meal-detail">
      
      <img src={meal.strMealThumb} alt={meal.strMeal} className='detail-img' />
      <div>
      <h2>{meal.strMeal}</h2>
      <p>{meal.strInstructions}</p>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default MealDetail;
