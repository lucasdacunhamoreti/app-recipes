import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipeFood, getRecomendedCardDrink } from '../services/dataFoods';
import './FoodDetails.css';

export default function FoodDetails() {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [inProgress, setInProgress] = useState(false);

  function filterIngredientsAndMeasures(recipe, str) {
    const result = Object.entries(recipe)
      .map(([key, value]) => {
        if (key.includes(str)) {
          return value;
        }
        return '';
      })
      .filter((arr) => arr !== '' && arr !== null);
    return result;
  }

  function populateIngredients(recipe) {
    const ingredients = filterIngredientsAndMeasures(recipe, 'strIngredient');
    const measure = filterIngredientsAndMeasures(recipe, 'strMeasure');

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

  function populateIngredientsList(recipe) {
    const ingredients = filterIngredientsAndMeasures(recipe, 'strIngredient');
    const measure = filterIngredientsAndMeasures(recipe, 'strMeasure');

    return ingredients.map((item, index) => (
      <div key={ index }>
        <input
          id={ index }
          type="checkbox"
          name={ item }
          data-testid={ `${index}-ingredient-name-and-measure` }
        />
        <label htmlFor={ index }>
          { measure[index]
            ? `${ingredients[index]} - ${measure[index]}`
            : `${ingredients[index]}`}
        </label>
      </div>));
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
      setRecommended(result);
    }
    fetch();
  }, []);

  //   const mealsInfo = { name, score, picture };
  //   if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  //     const ranking = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //     localStorage.setItem('inProgressRecipes', JSON.stringify([...ranking, playerInfo]));
  //   } else {
  //     localStorage.setItem('inProgressRecipes', JSON.stringify([playerInfo]));
  //   }
  // }

  useEffect(() => {
    const idRecipe = history.location.pathname.split('s/')[1];
    async function getRecipe() {
      const api = await getRecipeFood(idRecipe);
      // console.log(api);
      setRecipes(api);
      // setLocalStorage(api);
    }
    getRecipe();
  }, [history]);

  function recipeStatus() {
    if (inProgress) {
      history.push('/foods');
      setInProgress(false);
    }
    setInProgress(true);
  }

  function recipeInProgress() {
    // console.log(recipe);
    // const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipes[0]) {
      const arr = ['a', 'b'];

      const item = { meals: `${recipes[0].idMeal}: ${['ing 1', 'ing 2']}` };
      // const item = { meals: `${recipes[0].idMeal}: ${arr}` };
      // const item = { meals: `${recipes[0].idMeal}` }};
      console.log(item);
      localStorage.setItem('inProgressRecipes', JSON.stringify(item));
    }
    // const { idMeal } = recipe
    // console.log(item);
  }

  // const getRecipeInProgress = recipeInProgress();
  recipeInProgress();

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
          {!inProgress ? (
            <ul>
              {populateIngredients(recipe)}
            </ul>)
            : (
              <ul>
                {populateIngredientsList(recipe)}
              </ul>
            )}
          <span data-testid="instructions">{ recipe.strInstructions }</span>
          <div>
            {!inProgress
            && (
              <section>
                <iframe
                  // src={ recipe.strYoutube }
                  // src="https://www.youtube.com/embed/YsJXZwE5pdY"
                  src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
                  data-testid="video"
                  title="video player"
                  width="360"
                  heigth="420"
                />
                <div className="recommended-card">
                  {setRecommendedCard()}
                </div>
              </section>
            )}
          </div>
          <div className="btn-start-recipe-container">
            {!inProgress ? (
              <button
                className="btn-start-recipe"
                data-testid="start-recipe-btn"
                type="button"
                onClick={ recipeStatus }
              >
                Start Recipe
              </button>)
              : (
                <button
                  className="btn-start-recipe"
                  data-testid="finish-recipe-btn"
                  type="button"
                  onClick={ recipeStatus }
                >
                  Finish Recipe
                </button>)}
          </div>
        </div>
      )) }
    </div>
  );
}
