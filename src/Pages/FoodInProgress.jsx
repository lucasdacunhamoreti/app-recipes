import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import './FoodInProgress.css';

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

  // const verifyRecipe = (local, id) => local?.some((e) => e.id === id);
  const verifyRecipe = (local) => local?.some((e) => e.id === id);

  // function setDoneFoodRecipe(recipe) {
  function setDoneFoodRecipe() {
    // console.log('recipe', recipe);
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
    // console.log('doneRecipe out', doneRecipe);
    const doneRecipeString = JSON.stringify([doneRecipe]);
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', doneRecipeString);
      setDoneRecipes(doneRecipe);
    } else {
      // console.log('doneRecipe else', doneRecipe);
      const local = JSON.parse(localStorage.getItem('doneRecipes'));
      // console.log('veri', verifyRecipe(local, doneRecipe.id));
      // console.log('veri', doneRecipe.id);
      // console.log('local', local);
      if (!(verifyRecipe(local))) {
        // console.log('doneRecipe in', doneRecipe);
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
    <div
      className="inProgress-container"
      key={ recipe.idMeal }
    >
      <div className="header-details">
        <div className="details-image-container">
          <img
            className="details-img"
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt={ recipe.strMealThumb }
          />
        </div>
        <div className="header-title-conainer">
          <div className="left">
            <span data-testid="recipe-title">{recipe.strMeal}</span>
            <span data-testid="recipe-category">{recipe.strCategory}</span>
          </div>
          <div className="header-details-btns-container">
            <FavoritedFood recipe={ recipe } />
          </div>
        </div>
      </div>
      <ul className="ingredients-list">
        <IngredientsRecipeFoodInProgress
          recipe={ recipe }
          countIngredients={ countIngredients }
        />
      </ul>

      <span
        className="instructions"
        data-testid="instructions"
      >
        { recipe.strInstructions }

      </span>

      <div className="btn-start-recipe-container">
        {console.log('isDisabled', isDisabled)}
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
  );
}
