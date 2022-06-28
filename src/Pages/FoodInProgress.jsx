import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import IngredientsRecipeFoodInProgress
from '../Components/IngredientsRecipeFoodInProgress';

import { getRecipeFood } from '../services/dataFoods';

export default function FoodInProgress() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeFood(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  return (
    <div>
      <div key={ recipe.idMeal }>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMealThumb }
        />
        <span data-testid="recipe-title">{recipe.strMeal}</span>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <span data-testid="recipe-category">{recipe.strCategory}</span>

        <ul>
          <IngredientsRecipeFoodInProgress recipe={ recipe } />
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
