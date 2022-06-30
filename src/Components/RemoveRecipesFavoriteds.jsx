import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import RecipesContext from '../Context/RecipesContext';

const copy = require('clipboard-copy');

export default function RemoveRecipesFavoriteds({ id, index, type }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [alertCopyboard, setAlertCopyboard] = useState(false);

  const { setFavoriteRecipes } = useContext(RecipesContext);

  function handleFavorite() {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isInLocalStorage = favoriteRecipes.some(
      (item) => item.id === id,
    );
    if (isInLocalStorage) {
      favoriteRecipes = favoriteRecipes.filter(
        (favorite) => favorite.id !== id,
      );
      setFavoriteRecipes(favoriteRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorited(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifyLocalStorage = getLocalStorage.some((item) => item.id === id);
      if (verifyLocalStorage) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [id, isFavorited]);

  function iconFavorite() {
    if (isFavorited) {
      return blackHeartIcon;
    }
    return whiteHearthIcon;
  }

  function copyLinkRecipe() {
    if (!alertCopyboard) {
      copy(`http://localhost:3000/${type === 'food' ? 'foods' : 'drinks'}/${id}`);
    }
    setAlertCopyboard(true);
  }

  return (
    <div>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ copyLinkRecipe }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt={ shareIcon } />

      </button>
      { alertCopyboard && <h4>Link copied!</h4> }
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ iconFavorite() }
        onClick={ handleFavorite }
      >
        <img src={ iconFavorite() } alt={ iconFavorite() } />

      </button>
    </div>
  );
}

RemoveRecipesFavoriteds.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
