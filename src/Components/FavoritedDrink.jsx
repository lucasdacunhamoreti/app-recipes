import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoritedDrink({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [alertCopyboard, setAlertCopyboard] = useState(false);
  const { id } = useParams();

  function handleFavorite() {
    const favoriteRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    const favoriteRecipeString = JSON.stringify([favoriteRecipe]);
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', favoriteRecipeString);
      setIsFavorited(true);
    } else {
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifiedLocalStorage = getLocalStorage.some(
        (item) => item.id === recipe.idDrink,
      );
      if (verifiedLocalStorage) {
        const deletedRecipe = getLocalStorage.filter(
          (favorite) => favorite.id !== favoriteRecipe.id,
        );
        const deletedRecipeString = JSON.stringify(deletedRecipe);
        localStorage.setItem('favoriteRecipes', deletedRecipeString);
        setIsFavorited(false);
      } else {
        getLocalStorage.push(favoriteRecipe);
        const newLocalStorageString = JSON.stringify(getLocalStorage);
        localStorage.setItem('favoriteRecipes', [newLocalStorageString]);
        setIsFavorited(true);
      }
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
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setAlertCopyboard(true);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLinkRecipe }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt={ shareIcon } />

      </button>
      <h4>{ alertCopyboard && 'Link copied!' }</h4>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ iconFavorite() }
        onClick={ handleFavorite }
      >
        <img src={ iconFavorite() } alt={ iconFavorite() } />

      </button>
    </div>
  );
}

FavoritedDrink.propTypes = {
  recipe: PropTypes.arrayOf.isRequired,
};
