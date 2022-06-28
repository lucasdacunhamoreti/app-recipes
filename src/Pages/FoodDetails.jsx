import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getRecipeFood, getRecomendedCardDrink } from '../services/dataFoods';
import IngredientsRecipeFood from '../Components/IngredientsRecipeFood';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import './FoodDetails.css';

export default function FoodDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [status, setStatus] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [alertCopyboard, setAlertCopyboard] = useState(false);

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
      const objs = Object.keys(local.meals);
      if (objs.some((item) => item === id)) {
        const verifyContent = Object.values(local.meals[id]);
        return verifyContent.length === 0 || verifyContent.length !== 0
          ? setStatus('Continue Recipe') : setStatus(startRecipe);
      }
      setStatus(startRecipe);
    }
  }

  useEffect(() => {
    verifyRecipeInitialized();
  }, []);

  function handleFavorite() {
    const favoriteRecipe = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    const favoriteRecipeString = JSON.stringify([favoriteRecipe]);
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', favoriteRecipeString);
      setIsFavorited(true);
    } else {
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifiedLocalStorage = getLocalStorage.some(
        (item) => item.id === recipe.idMeal,
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

  function copyLinkRecipe() {
    if (!alertCopyboard) {
      return navigator.clipboard.writeText(recipe.strYoutube)
        .then(() => global.alert('Link copied!'));
    }
    setAlertCopyboard(true);
  }

  return (
    <div>
      <div key={ recipe.idMeal }>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMealThumb }
        />
        <span data-testid="recipe-title">{recipe.strMeal}</span>
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
            <div className="recommended-card">
              {setRecommendedCard()}
            </div>
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
