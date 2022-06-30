import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import IngredientsRecipeDrinkInProgress
from '../Components/IngredientsRecipeDrinkInProgress';

import { getRecipeDrinks } from '../services/dataDrinks';
import FavoritedDrink from '../Components/FavoritedDrink';
import { setDoneDrinkRecipe } from '../services/localSorage';

export default function DrinkInProgress() {
  const { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({});
  const [allChecked, setAllChecked] = useState(true);

  const doneRecipe = () => {
    setDoneDrinkRecipe(recipe);
    history.push('/done-recipes');
  };

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeDrinks(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  const countIngredients = (checked, total) => {
    if (total > 0 && checked === total) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
    // console.log('checked', checked);
    // console.log('total', total);
  };

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
          <IngredientsRecipeDrinkInProgress
            recipe={ recipe }
            countIngredients={ countIngredients }
          />
        </ul>

        <span data-testid="instructions">{ recipe.strInstructions }</span>

        <div className="btn-start-recipe-container">
          <button
            className="btn-start-recipe"
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ doneRecipe }
            disabled={ allChecked }
          >
            Finish Recipe
          </button>

        </div>
      </div>
    </div>
  );
}
