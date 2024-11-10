// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import MealCard from '../components/MealCard';
// import MealDetailModal from '../components/MealDetailModal';

// const SearchResults = () => {
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [meals, setMeals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [error, setError] = useState('');
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const query = searchParams.get('q');
//     if (query) {
//       setSearchQuery(query);
//       handleSearch(query);
//     }
//   }, [location.search]);

//   const handleSearch = async (query) => {
//     if (!query.trim()) {
//       setError('Please enter an ingredient to search');
//       setMeals([]);
//       return;
//     }

//     setError('');
//     try {
//       const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
//       if (response.data.meals) {
//         setMeals(response.data.meals);
//         console.log('Search Results:', {
//           query: query,
//           totalResults: response.data.meals.length,
//           meals: response.data.meals.map(meal => ({
//             id: meal.idMeal,
//             name: meal.strMeal,
//             thumbnail: meal.strMealThumb
//           }))
//         });
//       } else {
//         setMeals([]);
//         console.log('No results found for:', query);
//         setError('No data found for this ingredient');
//       }
//     } catch (err) {
//       console.log('Search error:', err);
//       setError('An error occurred while fetching data');
//     }
// };


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
//     <div className="search-results">
//       <Navbar
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         handleSearch={() => handleSearch(searchQuery)}
//       />
//       {error && <p className="error">{error}</p>}
//       <div className="meals-container">
//         {meals.map((meal) => (
//           <MealCard 
//             key={meal.idMeal} 
//             meal={meal} 
//             onClick={() => handleMealClick(meal.idMeal)} 
//           />
//         ))}
//       </div>
//       {selectedMeal && (
//         <MealDetailModal meal={selectedMeal} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default SearchResults;



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import MealCard from '../components/MealCard';
import MealDetailModal from '../components/MealDetailModal';
import Footer from '../components/Footer';

const SearchResults = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

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

      {/* {meals.length > 0 && (
        <div className="search-slider">
          <Slider {...settings}>
            {meals.slice(0, 4).map((meal) => (
              <div key={meal.idMeal} className="slide" onClick={() => handleMealClick(meal.idMeal)}>
                <div className="image-container">
                  <img 
                    src={meal.strMealThumb} 
                    alt={meal.strMeal} 
                    className="slide-image"
                  />
                  <h1 className="slide-text-search">{meal.strMeal}</h1>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )} */}

{meals.length > 0 && (
  <div className="search-hero">
    <div className="hero-image-container">
      <img 
        src={meals[7].strMealThumb} 
        alt={meals[0].strMeal} 
        className="hero-image"
      />
      <h1 className="hero-title">{meals[0].strMeal}</h1>
    </div>
  </div>
)}


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
      <Footer />
    </div>
  );
};

export default SearchResults;
