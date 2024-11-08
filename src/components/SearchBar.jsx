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
//       <button onClick={handleSearch}>Search  
//         <i className="fas fa-search "></i>
//       </button>

//     </div>
//   );
// };

// export default SearchBar;




import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter ingredient"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={onKeyPress}
      />
      <button onClick={handleSearch}>
        Search
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
