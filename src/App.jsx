// // import React from 'react';
// // import Home from './pages/Home';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// // import './index.css';
// // import MealDetail from './components/MealDetail';
// // function App() {
// //   return (
// //     <div className="App">
// //       <Home />
// //     </div>
    
// //   );
// // }

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import MealDetail from './components/MealDetail';
// import './index.css';

// const App = () => (
//   <Router>
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/meal/:mealId" element={<MealDetail />} />
//       </Routes>
//     </div>
//   </Router>
// );

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MealDetail from './components/MealDetail';
import SearchResults from './pages/SearchResults';
import './index.css';

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/meal/:mealId" element={<MealDetail />} />
      </Routes>
    </div>
  </Router>
);

export default App;
