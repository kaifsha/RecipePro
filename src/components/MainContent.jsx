// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const MainContent = () => {
//   const [slides, setSlides] = useState([]);
//   const navigate = useNavigate();

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
//     dots: false, // Hide the dots
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//   };

//   const handleSlideClick = (mealId) => {
//     navigate(`/meal/${mealId}`);
//   };

//   return (
//     <div className="main-content">
//       <h2>Featured Recipes</h2>
//       <Slider {...settings}>
//         {slides.map((slide) => (
//           <div key={slide.idMeal} className="slide" onClick={() => handleSlideClick(slide.idMeal)}>
//             <div className="image-container">
//               <img 
//                 src={slide.strMealThumb} 
//                 alt={slide.strMeal} 
//                 className="slide-image"
//               />
//               <h3 className="slide-text">{slide.strMeal}</h3>
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

const MainContent = () => {
  const [slides, setSlides] = useState([]);
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

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setSlides(response.data.meals.slice(0, 4));
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

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

  return (
    <div className="main-content">
      <Slider {...settings}>
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
    </div>
  );
};

export default MainContent;
