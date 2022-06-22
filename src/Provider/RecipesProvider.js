import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/RecipesContext';

function RecipesProvider({ children }) {
  const [dataApiFoods, setDataApiFoods] = useState([]);
  const [dataApiDrinks, setDataApiDrinks] = useState([]);

  const context = {
    dataApiFoods,
    setDataApiFoods,
    dataApiDrinks,
    setDataApiDrinks,
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
