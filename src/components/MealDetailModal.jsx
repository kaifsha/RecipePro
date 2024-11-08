import React from 'react';

const MealDetailModal = ({ meal, onClose }) => {
  if (!meal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="close-button">X</button>
        <div className="modal-content">
          {/* Image Section */}
          <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-image" />

          {/* Details Section */}
          <div className="modal-details">
            <h2>{meal.strMeal}</h2>
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p>
            <div className="instructions">
              <h3>Instructions</h3>
              <p>{meal.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetailModal;
