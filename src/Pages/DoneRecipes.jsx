import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';
import RecipesContext from '../Context/RecipesContext';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const {
    doneRecipes,
  } = useContext(RecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);
  const [alertCopyboard, setAlertCopyboard] = useState(false);

  const filterDoneRecipes = (recipe) => {
    if (recipe === 'foods') {
      const foods = doneRecipes.filter((type) => type.type === 'food');
      setFilteredRecipes(foods);
    } else if (recipe === 'drinks') {
      const drinks = doneRecipes.filter((type) => type.type === 'drink');
      setFilteredRecipes(drinks);
    } else {
      setFilteredRecipes(doneRecipes);
    }
  };

  function copyLinkRecipe(id) {
    if (!alertCopyboard) {
      copy(`http://localhost:3000/foods/${id}`);
    }
    setAlertCopyboard(true);
  }
  const getTags = (recipe, index) => {
    const { tags } = recipe;
    let tagList = [];

    if (typeof (tags) === 'object') {
      tagList = tags;
    }
    if (typeof (tags) === 'string') {
      tagList = tags.split(',');
    }

    const myTags = [];
    if (tagList) {
      myTags.push(tagList[0]);
    }
    if (tagList) {
      myTags.push(tagList[1]);
    }

    return (
      <>
        {myTags.map((tag) => (
          <div
            key={ tag }
            name={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </div>
        ))}
      </>
    );
  };

  function getFoodCard(recipe, index) {
    return (
      <div
        className="inProgress-container"
        key={ index }
      >
        <div className="header-details">
          <div className="details-image-container">
            <Link to={ `/drinks/${recipe.id}` }>
              <img
                className="details-img"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ recipe.name }
              />
            </Link>
          </div>
          <div className="header-title-conainer">
            <div className="left">
              <Link className="link" to={ `/drinks/${recipe.id}` }>
                <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
              </Link>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </span>
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </span>
              {getTags(recipe, index)}
            </div>
            <button
              className="header-details-btns-container"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ copyLinkRecipe }
            >
              <img src={ shareIcon } alt={ shareIcon } />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function getDrinkCard(recipe, index) {
    return (
      <div
        className="inProgress-container"
        key={ index }
      >
        <div className="header-details">
          <div className="details-image-container">
            <Link className="link" to={ `/drinks/${recipe.id}` }>
              <img
                className="details-img"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
          </div>
          <div className="header-title-conainer">
            <div className="left">
              <Link to={ `/drinks/${recipe.id}` }>
                <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
              </Link>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.category} - ${recipe.alcoholicOrNot}`}
              </span>
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </span>
              {getTags(recipe, index)}
            </div>
            <button
              className="header-details-btns-container"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ copyLinkRecipe }
            >
              <img src={ shareIcon } alt={ shareIcon } />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section>
        <div className="done-recipe-menu-container">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => filterDoneRecipes('all') }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => filterDoneRecipes('foods') }
          >
            Foods
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => filterDoneRecipes('drinks') }
          >
            Drinks
          </button>
        </div>
      </section>
      <section>
        {filteredRecipes && filteredRecipes.length > 0
        && filteredRecipes.map((recipe, index) => {
          let result;
          if (recipe.type === 'food') {
            result = getFoodCard(recipe, index);
          } else {
            result = getDrinkCard(recipe, index);
          }
          return result;
        })}
      </section>
    </div>
  );
}
export default DoneRecipes;
