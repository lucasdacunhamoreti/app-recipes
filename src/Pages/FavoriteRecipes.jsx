import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import RemoveRecipesFavoriteds from '../Components/RemoveRecipesFavoriteds';

import RecipesContext from '../Context/RecipesContext';

import Header from '../Components/Header';

function FavoriteRecipes() {
  const {
    setFavoriteRecipes,
    favoriteRecipes,
    changeFavorites,
  } = useContext(RecipesContext);

  function listFavoriteRecipes() {
    if (favoriteRecipes) {
      const favoriteRecipe = favoriteRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ recipe.type === 'food' ? `/foods/${recipe.id}` : `/drinks/${recipe.id}` }
          >
            <div>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.image }
              />
              <h5 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h5>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'food'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot}`}
              </span>
            </div>
          </Link>
          <RemoveRecipesFavoriteds
            id={ recipe.id }
            index={ index }
            type={ recipe.type }
          />
        </div>
      ));
      return favoriteRecipe;
    }
  }

  function handleFilterFavorited({ target }) {
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { name } = target;

    switch (name) {
    case 'All':
      setFavoriteRecipes(localFavorite?.filter((item) => item));
      break;
    case 'Foods':
      setFavoriteRecipes(localFavorite?.filter((item) => item.type === 'food'));
      break;
    case 'Drinks':
      setFavoriteRecipes(localFavorite?.filter((item) => item.type === 'drink'));
      break;
    default:
      return null;
    }
  }

  useEffect(() => {
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(localFavorite);
  }, [changeFavorites]);

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ handleFilterFavorited }
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          name="Foods"
          onClick={ handleFilterFavorited }
          type="button"
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="Drinks"
          onClick={ handleFilterFavorited }
          type="button"
        >
          Drinks
        </button>
      </div>

      { listFavoriteRecipes() }
    </div>
  );
}

export default FavoriteRecipes;
