import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';

import IngredientsRecipeDrinkInProgress
from '../Components/IngredientsRecipeDrinkInProgress';

import { getRecipeDrinks } from '../services/dataDrinks';
import FavoritedDrink from '../Components/FavoritedDrink';
// import { setDoneDrinkRecipe } from '../services/localSorage';

export default function DrinkInProgress() {
  const { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({});
  const [allChecked, setAllChecked] = useState(true);
  const {
    setDoneRecipes,
  } = useContext(RecipesContext);

  const verifyRecipe = (local) => local?.some((e) => e.id === id);

  function setDoneDrinkRecipe() {
    const data = new Date();
    const doneRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      // nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: data.toLocaleDateString(),
      tags: recipe.strTags,
    };
    const doneRecipeString = JSON.stringify([doneRecipe]);
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', doneRecipeString);
      setDoneRecipes(doneRecipe);
    } else {
      const local = JSON.parse(localStorage.getItem('doneRecipes'));
      if (!(verifyRecipe(local))) {
        localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRecipe]));
        setDoneRecipes([...local, doneRecipe]);
      }
    }
  }

  const doneRecipe = () => {
    setDoneDrinkRecipe();
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
