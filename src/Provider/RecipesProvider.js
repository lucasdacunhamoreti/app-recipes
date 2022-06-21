import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/RecipesContext';
// import dataFoods from '../Components/services/dataFoods';

function RecipesProvider({ children }) {
  const [searchRecipes, setSearchRecipe] = useState([]);
  // const [dataFood, setDataFood] = useState([]);

  const context = {
    setSearchRecipe,
    searchRecipes,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
