import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipeDrinks, getRecomendedCardFood } from '../services/dataDrinks';
import './FoodDetails.css';

export default function DrinkDetails() {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);
  const [recommended, setRecommended] = useState([]);

  function populateIngredients(recipe) {
    const ingredients = Object.entries(recipe)
      .map(([key, value]) => {
        if (key.includes('strIngredient')) {
          return value;
        }
        return '';
      })
      .filter((arr) => arr !== '' && arr !== null);

    const measure = Object.entries(recipe)
      .map(([key, value]) => {
        if (key.includes('strMeasure')) {
          return value;
        }
        return '';
      })
      .filter((arr) => arr !== '' && arr !== null);

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
          {recommended.map((food, index) => (
            <div
              key={ index }
              className="recomended-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ food.strMealThumb }
                alt={ food.strMealThumb }
              />
              <span>{ food.strCategory }</span>
              <span data-testid={ `${index}-recomendation-title` }>
                { food.strMeal }
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }

  useEffect(() => {
    async function fetch() {
      const result = await getRecomendedCardFood();
      setRecommended(result);
    }
    fetch();
  }, []);

  useEffect(() => {
    const idRecipe = history.location.pathname.split('s/')[1];
    async function getRecipe() {
      const api = await getRecipeDrinks(idRecipe);
      console.log(api);
      setRecipes(api);
    }
    getRecipe();
  }, [history]);

  return (
    <div>
      { recipes.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrinkThumb }
          />
          <span data-testid="recipe-title">{recipe.strDrink}</span>
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <span data-testid="recipe-category">{recipe.strAlcoholic}</span>

          <div>
            <h4>Ingredients</h4>
            <div>
              <ul>
                {populateIngredients(recipe)}
              </ul>
            </div>
          </div>

          <div>
            <h4>Instructions</h4>
            <div>
              <span data-testid="instructions">{ recipe.strInstructions }</span>

            </div>
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
