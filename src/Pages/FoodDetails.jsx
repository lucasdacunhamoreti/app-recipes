import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getRecipeFood, getRecomendedCardDrink } from '../services/dataFoods';
// import InProgressIngList from '../Components/inProgressIngList';
import IngredientsRecipeInProgress from '../Components/IngredientsRecipeInProgress';
import IngredientsRecipe from '../Components/IngredientsRecipe';
import './FoodDetails.css';

export default function FoodDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  // const [currentRecipe, setCurrentRecipe] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [inProgressStatus, setInProgressStatus] = useState(false);
  // const [inProgressRecipe, setInProgressRecipe] = useState([]);
  // const [inProgressRecipe, setInProgressRecipe] = useState([
  //   local = JSON.parse(localStorage.getItem('inProgressRecipes'))
  //     ? [JSON.parse(localStorage.getItem('inProgressRecipes').id)]
  //     : [],
  // ]);
  // const [isChecked, setIsChecked] = useState(false);
  // const [isChecked, setIsChecked] = useState([]);

  // function filterIngredientsAndMeasures(recipe, str) {
  //   const result = Object.entries(recipe)
  //     .map(([key, value]) => {
  //       if (key.includes(str)) {
  //         return value;
  //       }
  //       return '';
  //     })
  //     .filter((arr) => arr !== '' && arr !== null && arr !== ' ');
  //   return result;
  // }

  // function listProgressChange({ target }) {
  //   if (target.checked) {
  //     setInProgressRecipe([...inProgressRecipe, target.name]);
  //   } else {
  //     setInProgressRecipe(inProgressRecipe.filter((recipe) => recipe !== target.name));
  //   }
  //   // setIsChecked(!isChecked);
  // }

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

  // useEffect(() => {
  // recipeInProgress();
  // }, [inProgressRecipe]);

  useEffect(() => {
    async function fetch() {
      const result = await getRecomendedCardDrink();
      setRecommended(result);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeFood(id);
      setRecipes(api);
      setCurrentRecipe(api[0]);
    }
    getRecipe();
  }, [history]);

  function recipeStatus() {
    if (inProgressStatus) {
      history.push('/foods');
      setInProgressStatus(false);
    }
    setInProgressStatus(true);
  }

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
              {/* {populateIngredients(recipe)} */}
              <IngredientsRecipe recipe={ recipe } />
            </ul>)
            : (
              <ul>
                <IngredientsRecipeInProgress recipe={ recipe } />
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
