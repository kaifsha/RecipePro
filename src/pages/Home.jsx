



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import MealCard from '../components/MealCard';
// import MealDetailModal from '../components/MealDetailModal';
// import MainContent from '../components/MainContent';

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [meals, setMeals] = useState([]);
//   const [error, setError] = useState('');
//   const [selectedMeal, setSelectedMeal] = useState(null);

//   useEffect(() => {
//     const fetchAllMeals = async () => {
//       try {
//         const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
//         const allMeals = response.data.meals;

//         const ingredients = new Set();
//         allMeals.forEach(meal => {
//           for (let i = 1; i <= 20; i++) {
//             const ingredient = meal[`strIngredient${i}`];
//             if (ingredient) ingredients.add(ingredient);
//           }
//         });

//         console.log('Unique ingredients:', Array.from(ingredients));
//       } catch (error) {
//         console.error('Failed to fetch meals:', error);
//       }
//     };

//     fetchAllMeals();
//   }, []);

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       setError('Please enter an ingredient to search');
//       setMeals([]);
//       return;
//     }

//     setError('');
//     try {
//       const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`);
//       if (response.data.meals) {
//         setMeals(response.data.meals);
//       } else {
//         setMeals([]);
//         setError('No data found for this ingredient');
//       }
//     } catch (err) {
//       setError('An error occurred while fetching data');
//     }
//   };

//   // Fetch details of the selected meal
//   const handleMealClick = async (mealId) => {
//     try {
//       const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
//       setSelectedMeal(response.data.meals[0]);
//     } catch (error) {
//       console.error('Failed to fetch meal details:', error);
//     }
//   };

//   const handleCloseModal = () => {
//     setSelectedMeal(null);
//   };

//   return (
//     <div className="home">
//       <Navbar 
//         searchQuery={searchQuery} 
//         setSearchQuery={setSearchQuery} 
//         handleSearch={handleSearch} 
//       />
      
//       <MainContent />
//       {error && <p className="error">{error}</p>}
//       <div className="meals-container">
//         {meals.map((meal) => (
//           <MealCard key={meal.idMeal} meal={meal} onClick={() => handleMealClick(meal.idMeal)} />
//         ))}
//       </div>
//       {selectedMeal && (
//         <MealDetailModal meal={selectedMeal} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        console.log('Available Ingredients:', response.data.meals.map(item => ({
          name: item.strIngredient,
          description: item.strDescription
        })));
      } catch (error) {
        console.log('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="home">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <MainContent />
    </div>
  );
};

export default Home;
