import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipeFood, getRecomendedCardDrink } from '../services/dataFoods';
import './FoodDetails.css';

export default function FoodDetails() {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);
  const [recommended, setRecommended] = useState([]);

  function populateIngredients(recipe) {
    const ingredientsKeys = Object.keys(recipe)
      .map((key, index) => {
        if (key.includes('strIngredient')) {
          return index;
        }
        return null;
      })
      .filter((arr) => arr !== null);
    const measureKeys = Object.keys(recipe)
      .map((key, index) => {
        if (key.includes('strMeasure')) {
          return index;
        }
        return null;
      })
      .filter((arr) => arr !== null);
    const min = Math.min(...ingredientsKeys);
    const max = Math.max(...ingredientsKeys);
    const minM = Math.min(...measureKeys);
    const maxM = Math.max(...measureKeys);

    const ingredients = (Object.values(recipe)
      .filter((value, index) => (index > min && index < max && value !== '')));
    const measure = (Object.values(recipe)
      // .filter((value, index) => (index > minM && index < maxM && value.length > 1)));
      .filter((value, index) => (index > minM && index < maxM && value !== ' ')));
    console.log(ingredients, measure);
    return ingredients.map((item, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        { measure[index]
          ? `${ingredients[index]} - ${measure[index]}`
          : `${ingredients[index]}`}
      </li>));
  }

  function setRecommendedCard() {
    return (
      <>
        <h1>Recommended</h1>
        <div className="card-container">
          {recommended.map((drink, index) => (
            <div
              key={ index }
              className="recomended-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrinkThumb }
              />
              <span>{ drink.strAlcoholic }</span>
              <span data-testid={ `${index}-recomendation-title` }>
                { drink.strDrink }
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }

  useEffect(() => {
    async function fetch() {
      const result = await getRecomendedCardDrink();
      // console.log(result);
      setRecommended(result);
    }
    fetch();
  }, []);

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

          <span data-testid="instructions">{ recipe.strInstructions }</span>
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
          <div className="recommended-card">
            {setRecommendedCard()}
          </div>

          <div className="btn-start-recipe-container">
            <button
              className="btn-start-recipe"
              data-testid="start-recipe-btn"
              type="button"
            >
              Start Recipe
            </button>
          </div>
        </div>
      )) }
    </div>
  );
}
