



// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const MainContent = () => {
//   const [slides, setSlides] = useState([]);
//   const navigate = useNavigate();
  
//   const NextArrow = ({ onClick }) => (
//     <div className="arrow next" onClick={onClick}>
//       <FaChevronRight />
//     </div>
//   );

//   const PrevArrow = ({ onClick }) => (
//     <div className="arrow prev" onClick={onClick}>
//       <FaChevronLeft />
//     </div>
//   );

//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
//         setSlides(response.data.meals.slice(0, 4));
//       } catch (error) {
//         console.error('Error fetching meals:', error);
//       }
//     };

//     fetchMeals();
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />
//   };

//   const handleSlideClick = (mealId) => {
//     navigate(`/meal/${mealId}`);
//   };

//   return (
//     <div className="main-content">
//       <Slider {...settings}>
//         {slides.map((slide) => (
//           <div key={slide.idMeal} className="slide" onClick={() => handleSlideClick(slide.idMeal)}>
//             <div className="image-container">
//               <img 
//                 src={slide.strMealThumb} 
//                 alt={slide.strMeal} 
//                 className="slide-image"
//               />
//               <h1 className="slide-text">{slide.strMeal}</h1>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default MainContent;



import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RecipeLogo from '../assets/RecipeLogo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';


const MainContent = () => {
  const [slides, setSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(6);
  const navigate = useNavigate();
  
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [mealsResponse, categoriesResponse] = await Promise.all([
  //         axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='),
  //         axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
  //       ]);
  //       setSlides(mealsResponse.data.meals.slice(0, 4));
  //       setCategories(categoriesResponse.data.categories || []);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sliderMeals, categoriesResponse, favoritesResponse] = await Promise.all([
          axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'), // Fetching seafood for stunning visuals
          axios.get('https://www.themealdb.com/api/json/v1/1/categories.php'),
          axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
        ]);
        
        // Get the detailed information for each slider meal
        const detailedSlides = await Promise.all(
          sliderMeals.data.meals.slice(0, 4).map(meal => 
            axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
          )
        );
        
        setSlides(detailedSlides.map(response => response.data.meals[0]));
        setCategories(categoriesResponse.data.categories || []);
        setFavorites(favoritesResponse.data.meals.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  const [favorites, setFavorites] = useState([]);

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

  const handleSlideClick = (mealId) => {
    navigate(`/meal/${mealId}`);
  };

  const handleLoadMore = () => {
    setVisibleCategories(prev => prev + 6);
  };

  const handleCategoryClick = (category) => {
    navigate(`/search?q=${category.strCategory}`);
  };
  

  return (
    <div className="main-content">
      <Slider {...settings} className='slider-content'>
        {slides.map((slide) => (
          <div key={slide.idMeal} className="slide" onClick={() => handleSlideClick(slide.idMeal)}>
            <div className="image-container">
              <img 
                src={slide.strMealThumb} 
                alt={slide.strMeal} 
                className="slide-image"
              />
              <h1 className="slide-text">{slide.strMeal}</h1>
            </div>
          </div>
        ))}
      </Slider>

            <div className="popular-categories">
              <h2 className="categories-title">Most Popular Categories</h2>
              <p className="categories-subtitle">
                Be sure not to miss out the categories of these most popular <br /> categories. Enjoy trying them out!
              </p>
              
              <div className='categories-container'>
                <div className="categories-grid">
                  {categories.slice(0, visibleCategories).map((category) => (
                    <div 
                        key={category.idCategory} 
                        className="category-card"
                        onClick={() => handleCategoryClick(category)}
                      >
                      <h3 className='category-title'>{category.strCategory}</h3>
                      <img src={category.strCategoryThumb} alt={category.strCategory} />
                      
                    </div>
                  ))}
                </div>
              </div>

              {categories.length > visibleCategories && (
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load More
                </button>
              )}
            </div>

      <div className='Fav-section'>
        <div className='Fav-content'>
          <h2 className='Fav-title'>Current Favorites</h2>
          <p>Every week we present you with a selection of our personal <br /> favorite recipes. Enjoy trying them out!</p>
          
          <div className="favorites-container">
              <div className="favorites-layout">
                <div className="fav-left" onClick={() => handleSlideClick(favorites[0]?.idMeal)}>
                  <img src={favorites[0]?.strMealThumb} alt={favorites[0]?.strMeal} />
                  <span className="fav-title">{favorites[0]?.strMeal}</span>
                </div>
                
                <div className="fav-right">
                  <div className="fav-right-top" onClick={() => handleSlideClick(favorites[1]?.idMeal)}>
                    <img src={favorites[1]?.strMealThumb} alt={favorites[1]?.strMeal} />
                    <span className="fav-title">{favorites[1]?.strMeal}</span>
                  </div>
                  <div className="fav-right-bottom" onClick={() => handleSlideClick(favorites[2]?.idMeal)}>
                    <img src={favorites[2]?.strMealThumb} alt={favorites[2]?.strMeal} />
                    <span className="fav-title">{favorites[2]?.strMeal}</span>
                  </div>
                </div>
              </div>
            </div>

              </div>
            </div>

      
            <div className='Sub-section'>
        <div className="Sub-content">
          <h1>Subscribe to our Newsletter</h1>
          <p>Fusce id velit placerat, efficitur libero placerat, sodales ante. Curabitur sed erosat orci congue vestibulum.
          </p>
              <button className='Sub-btn'>subscribe</button>
        </div>
      </div>

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
    </div>
  );
};

export default MainContent;
