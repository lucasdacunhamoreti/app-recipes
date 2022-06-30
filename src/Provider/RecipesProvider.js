import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/RecipesContext';

function RecipesProvider({ children }) {
  const [dataApiFoods, setDataApiFoods] = useState([]);
  const [dataApiDrinks, setDataApiDrinks] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(localFavorite);
  const [exploreSearch, setExploreSearch] = useState(
    { isCameExplore: false, nameIngredient: '' },
  );

  const context = {
    dataApiFoods,
    setDataApiFoods,
    dataApiDrinks,
    setDataApiDrinks,
    typeFilter,
    setTypeFilter,
    favoriteRecipes,
    setFavoriteRecipes,
    exploreSearch,
    setExploreSearch,
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
