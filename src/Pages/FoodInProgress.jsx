import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';

import IngredientsRecipeFoodInProgress
from '../Components/IngredientsRecipeFoodInProgress';

import { getRecipeFood } from '../services/dataFoods';
import FavoritedFood from '../Components/FavoritedFood';
// import setDoneFoodRecipe from '../services/localSorage';

export default function FoodInProgress() {
  // let ingredients = 0;
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    setDoneRecipes,
  } = useContext(RecipesContext);

  const verifyRecipe = (local) => local?.some((e) => e.id === id);

  function setDoneFoodRecipe() {
    const data = new Date();
    const doneRecipe = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
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
    setDoneFoodRecipe();
    history.push('/done-recipes');
  };

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeFood(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  const countIngredients = (checked, total) => {
    if (total > 0 && checked === total) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <div key={ recipe.idMeal }>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMealThumb }
        />
        <span data-testid="recipe-title">{recipe.strMeal}</span>

        <FavoritedFood recipe={ recipe } />

        <span data-testid="recipe-category">{recipe.strCategory}</span>

        <ul>
          <IngredientsRecipeFoodInProgress
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
            disabled={ isDisabled }
          >
            Finish Recipe
          </button>

        </div>
      </div>
    </div>
  );
}
