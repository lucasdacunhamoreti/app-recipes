import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getRecipeDrinks, getRecomendedCardFood } from '../services/dataDrinks';
import IngredientsRecipeDrink from '../Components/IngredientsRecipeDrink';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import './FoodDetails.css';

export default function DrinkDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [status, setStatus] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

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
                { food.strMeal}
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
    async function getRecipe() {
      const api = await getRecipeDrinks(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  function recipeStatus() {
    history.push(`/drinks/${id}/in-progress`);
  }

  function verifyRecipeInitialized() {
    const startRecipe = 'Start Recipe';
    if (!localStorage.getItem('inProgressRecipes')) {
      setStatus(startRecipe);
    } else {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const objs = Object.keys(local.cocktails);
      if (objs.some((item) => item === id)) {
        const verifyContent = Object.values(local.cocktails[id]);
        return verifyContent.length === 0 || verifyContent.length !== 0
          ? setStatus('Continue Recipe') : setStatus(startRecipe);
      }
      setStatus(startRecipe);
    }
  }

  useEffect(() => {
    verifyRecipeInitialized();
  }, []);

  // FEITO POR LUCAS E BRUNO
  function copyLinkRecipe() {
    return (navigator.clipboard.writeText(recipe.strVideo), global.alert('Link copied!'));
  }

  // FEITO POR LUCAS
  function handleFavorite() {
    const favoriteRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    const favoriteRecipeString = JSON.stringify([favoriteRecipe]);
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', favoriteRecipeString);
      setIsFavorited(true);
    } else {
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifiedLocalStorage = getLocalStorage.some(
        (item) => item.id === recipe.idDrink,
      );
      if (verifiedLocalStorage) {
        const deletedRecipe = getLocalStorage.filter(
          (favorite) => favorite.id !== favoriteRecipe.id,
        );
        const deletedRecipeString = JSON.stringify(deletedRecipe);
        localStorage.setItem('favoriteRecipes', deletedRecipeString);
        setIsFavorited(false);
      } else {
        getLocalStorage.push(favoriteRecipe);
        const newLocalStorageString = JSON.stringify(getLocalStorage);
        localStorage.setItem('favoriteRecipes', [newLocalStorageString]);
        setIsFavorited(true);
      }
    }
  }

  // FEITO POR LUCAS
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifyLocalStorage = getLocalStorage.some((item) => item.id === id);
      if (verifyLocalStorage) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [id, isFavorited]);

  function iconFavorite() {
    if (isFavorited) {
      return blackHeartIcon;
    }
    return whiteHearthIcon;
  }

  return (
    <div>
      <div key={ recipe.idDrink }>
        <img
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrinkThumb }
        />
        <span data-testid="recipe-title">{recipe.strDrink}</span>
        <span data-testid="recipe-category">{recipe.strAlcoholic}</span>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyLinkRecipe }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt={ shareIcon } />

        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          src={ iconFavorite() }
          onClick={ handleFavorite }
        >
          <img src={ iconFavorite() } alt={ iconFavorite() } />

        </button>
        <ul>
          <IngredientsRecipeDrink recipe={ recipe } />
        </ul>
        <span data-testid="instructions">{ recipe.strInstructions }</span>

        <div className="recommended-card">
          {setRecommendedCard()}
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
