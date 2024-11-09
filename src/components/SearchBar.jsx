




// import React from 'react';

// const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
//   const onKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Enter ingredient"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onKeyPress={onKeyPress}
//       />
//       <button onClick={handleSearch}>
//         Search
//         <i className="fas fa-search"></i>
//       </button>
//     </div>
//   );
// };

// export default SearchBar;



import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const data = await response.json();
        if (searchQuery.trim()) {
          const filtered = data.meals.filter(item => 
            item.strIngredient.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filtered);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, [searchQuery]);

  const handleSuggestionClick = (ingredient) => {
    setSearchQuery(ingredient);
    setShowSuggestions(false);
  };
  

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter ingredient"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>
          Search
          <i className="fas fa-search"></i>
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(item.strIngredient)}
            >
              <span>{item.strIngredient}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
