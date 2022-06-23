import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipeFood } from '../services/dataFoods';

export default function FoodDetails() {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);

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
          <div>
            <iframe
            // src={ recipe.strYoutube }
              src="https://www.youtube.com/embed/YsJXZwE5pdY"
              // src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('?v=').at(1)}` }
              data-testid="video"
              title="#"
              width="360"
              heigth="360"
            />
          </div>

          {/* <div data-testid="${index}-recomendation-card" /> */}
          <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
        </div>
      )) }
    </div>
  );
}
