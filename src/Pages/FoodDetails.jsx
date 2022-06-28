import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getRecipeFood } from '../services/dataFoods';
import IngredientsRecipeFood from '../Components/IngredientsRecipeFood';

import './FoodDetails.css';

import RecomendationCardFood from '../Components/RecomendationCardFood';
import FavoritedFood from '../Components/FavoritedFood';

export default function FoodDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  const [status, setStatus] = useState('');

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeFood(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  function recipeStatus() {
    history.push(`/foods/${id}/in-progress`);
  }

  function verifyRecipeInitialized() {
    const startRecipe = 'Start Recipe';

    if (!localStorage.getItem('inProgressRecipes')) {
      setStatus(startRecipe);
    } else {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const local2Keys = Object.keys(local);
      const verifyKey = local2Keys.some((e) => e === 'meals');
      if (verifyKey) {
        const objs = Object.keys(local.meals);
        if (objs.some((item) => item === id)) {
          const verifyContent = Object.values(local.meals[id]);
          return verifyContent.length === 0 || verifyContent.length !== 0
            ? setStatus('Continue Recipe') : setStatus(startRecipe);
        }
      }
      setStatus(startRecipe);
    }
  }

  useEffect(() => {
    verifyRecipeInitialized();
  }, []);

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
          <IngredientsRecipeFood recipe={ recipe } />
        </ul>
        <span data-testid="instructions">{ recipe.strInstructions }</span>
        <div>
          <section>
            <iframe
              src={ `https://www.youtube.com/embed/${recipe?.strYoutube?.split('=')[1]}` }
              data-testid="video"
              title="video player"
              width="360"
              heigth="420"
            />
            <RecomendationCardFood />
          </section>
        </div>
        <div className="btn-start-recipe-container">
          <button
            className="btn-start-recipe"
            data-testid="start-recipe-btn"
            type="button"
            onClick={ recipeStatus }
          >
            { status }
          </button>
        </div>
      </div>
    </div>
  );
}
