import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipeFood } from '../services/dataFoods';

export default function FoodDetails() {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);

  function populateIngredients(recipe) {
    const min = 8;
    const minM = 28;
    const max = 29;
    const maxM = 49;
    const ingredients = (Object.values(recipe)
      .filter((value, index) => (index > min && index < max && value !== '')));
    const measure = (Object.values(recipe)
      .filter((value, index) => (index > minM && index < maxM && value !== ' ')));
    console.log(ingredients, measure);
    return ingredients.map((item, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {`${ingredients[index]} - ${measure[index]}`}
      </li>));
  }

  useEffect(() => {
    const idRecipe = history.location.pathname.split('s/')[1];
    async function getRecipe() {
      const api = await getRecipeFood(idRecipe);
      console.log(api);
      setRecipes(api);
    }
    getRecipe();
  }, [history]);

  return (
    <div>
      { recipes.map((recipe) => (
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

          {/* <span data-testid="${index}-ingredient-name-and-measure">Ingredientes</span> */}
          {/* { console.log(recipe.strYoutube) } */}
          <span data-testid="instructions">{ recipe.strInstructions }</span>
          {/* { console.log(recipe)} */}
          {/* {console.log(Object.values(recipe)
            .filter((value, index) => (index > min && index < max && value !== '')))} */}
          <ul>
            {populateIngredients(recipe)}
          </ul>
          <div>
            <iframe
            // src={ recipe.strYoutube }
              // src="https://www.youtube.com/embed/YsJXZwE5pdY"
              src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
              data-testid="video"
              title="video player"
              width="360"
              heigth="420"
            />
          </div>

          {/* <div data-testid="${index}-recomendation-card" /> */}
          <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
        </div>
      )) }
    </div>
  );
}
