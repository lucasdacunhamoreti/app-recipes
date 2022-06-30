import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getRecipeDrinks } from '../services/dataDrinks';

import IngredientsRecipe from '../Components/IngredientsRecipe';

import './FoodDetails.css';

import RecomendationCardDrink from '../Components/RecomendationCardDrink';
import FavoritedDrink from '../Components/FavoritedDrink';
import { verifyRecipe } from '../services/localSorage';

export default function DrinkDetails() {
  const history = useHistory();
  const { id } = useParams();
  const localDone = JSON.parse(localStorage.getItem('doneRecipes'));

  const [recipe, setRecipe] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeDrinks(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  function recipeStatus() {
    history.push(`/drinks/${id}/in-progress`);
  }

  useEffect(() => {
    const startRecipe = 'Start Recipe';

    if (!localStorage.getItem('inProgressRecipes')) {
      setStatus(startRecipe);
    } else {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const localKeys = Object.keys(local);
      const verifyKey = localKeys.some((e) => e === 'cocktails');
      if (verifyKey) {
        const objs = Object.keys(local.cocktails);
        if (objs.some((item) => item === id)) {
          const verifyContent = Object.values(local.cocktails[id]);
          return verifyContent.length === 0 || verifyContent.length !== 0
            ? setStatus('Continue Recipe') : setStatus(startRecipe);
        }
      }
      setStatus(startRecipe);
    }
  }, []);

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
          <IngredientsRecipe recipe={ recipe } />
        </ul>
        <span data-testid="instructions">{ recipe.strInstructions }</span>

        <RecomendationCardDrink />

        <div className="btn-start-recipe-container">
          {!(verifyRecipe(localDone, id)) && (
            <button
              className="btn-start-recipe"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ recipeStatus }
            >
              { status }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
