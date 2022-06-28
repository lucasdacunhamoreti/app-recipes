import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import IngredientsRecipeDrinkInProgress
from '../Components/IngredientsRecipeDrinkInProgress';

import { getRecipeDrinks } from '../services/dataDrinks';
import FavoritedDrink from '../Components/FavoritedDrink';

export default function DrinkInProgress() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeDrinks(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  return (
    <div>
      <div key={ recipe.idDrink }>
        <img
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrinkThumb }
        />
        <span data-testid="recipe-title">{recipe.strDrink}</span>
        <span data-testid="recipe-category">{recipe.strAlcoholic}</span>

        <FavoritedDrink recipe={ recipe } />

        <ul>
          <IngredientsRecipeDrinkInProgress recipe={ recipe } />
        </ul>

        <span data-testid="instructions">{ recipe.strInstructions }</span>

        <div className="btn-start-recipe-container">
          <button
            className="btn-start-recipe"
            data-testid="finish-recipe-btn"
            type="button"
            // onClick={ recipeStatus }
          >
            Finish Recipe
          </button>

        </div>
      </div>
    </div>
  );
}
