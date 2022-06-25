import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipeFood, getRecomendedCardDrink } from '../services/dataFoods';
import './FoodDetails.css';

export default function FoodDetails() {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [inProgressStatus, setInProgressStatus] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState([]);

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

  function listProgressChange({ target }) {
    if (target.checked) {
      setInProgressRecipe([...inProgressRecipe, target.name]);
    } else {
      setInProgressRecipe(inProgressRecipe.filter((recipe) => recipe !== target.name));
    }
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
          onChange={ listProgressChange }
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

  useEffect(() => {
    const idRecipe = history.location.pathname.split('s/')[1];
    async function getRecipe() {
      const api = await getRecipeFood(idRecipe);
      setRecipes(api);
    }
    getRecipe();
  }, [history]);

  function handleProgressList() {
    const idRecipe = history.location.pathname.split('s/')[1];
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (local) {
      const objs = Object.values(local);
      const keys = objs.map((item) => Number(Object.keys(item)));
      keys.forEach((key) => {
        if (key === Number(idRecipe)) {
          // setInProgressRecipe(/* local.value*/);
        }
      });
    }
  }

  function recipeStatus() {
    if (inProgressStatus) {
      history.push('/foods');
      setInProgressStatus(false);
    }
    setInProgressStatus(true);
    handleProgressList();
  }

  function recipeInProgress() {
    const idRecipe = history.location.pathname.split('s/')[1];
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) && (recipes[0])) {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const objs = Object.values(local);
      // vai entrar caso a receita NÃO seja a da página
      // if (!(objs.some(({ meals }) => meals === idRecipe))) {
      const rdc = objs.reduce((acc, curr) => {
        console.log('acc', acc);
        console.log('curr', curr);
        console.log('Obj.curr', Object.keys(curr));
        const objCurr = Object.keys(curr)[0];
        console.log('objCurr', objCurr);
        // console.log(objCurr.map((key) => key === idRecipe));
        console.log('idRecipe', idRecipe);
        if (objCurr === idRecipe) {
          acc.meals = { ...curr, [idRecipe]: inProgressRecipe };
        } else {
          acc.meals = { ...curr, [idRecipe]: inProgressRecipe };
        }
        return acc;
        // });
      }, { meals: '' });
      console.log('reduce', rdc);

      localStorage.setItem('inProgressRecipes', JSON.stringify(rdc));
      // }
      // if (!(objs.some(({ meals }) => meals === idRecipe))) {
      // const item = { meals: { [idRecipe]: inProgressRecipe } };
      //   console.log(item);
      // }
    } else if (recipes[0]) {
      const item = { meals: { [idRecipe]: inProgressRecipe } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(item));
      // localStorage.setItem('inProgressRecipes', JSON.stringify([item]));
    }
  }

  useEffect(() => {
    recipeInProgress();
  }, [inProgressRecipe]);

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
          {!inProgressStatus ? (
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
            {!inProgressStatus
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
            {!inProgressStatus ? (
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
