import React, { useState, useContext } from 'react';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../Context/RecipesContext';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [alertCopyboard, setAlertCopyboard] = useState(false);
  const {
    doneRecipes,
  } = useContext(RecipesContext);

  // const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
  // if (localDone) {
  //   localDone.forEach((local) => console.log('local', local));
  // }

  console.log('doneRecipes', doneRecipes);

  function copyLinkRecipe() {
    if (!alertCopyboard) {
      copy(`http://localhost:3000/foods/${id}`);
    }
    setAlertCopyboard(true);
  }

  const getTags = (recipe, index) => {
    console.log('getTags');
    const { tags } = recipe;
    const tagList = [];
    if (typeof (tags) === 'string') {
      tagList.push(tags.split(','));
    }
    console.log('taglist', tagList);
    return (
      tagList.map((tag, tagIndex) => {
      // tags?.split(',').map((tag, tagIndex) => {
        console.log(tag);
        if (tagIndex < 2) {
          return (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          );
        }
        return ('');
      })
    );
  };
  // const getTags = (recipe, index) => {
  //   console.log('getTags');
  //   const { tags } = recipe;
  //   const tagList = [];
  //   if (typeof (tags) === 'string') {
  //     tagList.push(tags?.split(','));
  //   }
  //   console.log(tagList);
  //   return (
  //     tagList.map((tag, tagIndex) => {
  //       console.log(tag);
  //       if (tagIndex < 2) {
  //         return (
  //           <p
  //             key={ tag }
  //             data-testid={ `${index}-${tag}-horizontal-tag` }
  //           >
  //             {tag}
  //           </p>
  //         );
  //       }
  //       return (
  //         ''
  //       );
  //     })
  //   );
  // };

  function getFoodCard(recipe, index) {
    return (
      <div key={ index }>
        <div>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt={ recipe.name }
          />
          <span data-testid={ `${index}-horizontal-name` }>{recipe.name}</span>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.category}
          </span>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneData}
          </span>
          <span>
            {recipe.nationality}
          </span>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ copyLinkRecipe }
          >
            <img src={ shareIcon } alt={ shareIcon } />

          </button>
          {getTags(recipe, index)}
        </div>
      </div>
    );
  }
  function getDrinkCard(recipe, index) {
    return (
      <div key={ index }>
        <div>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <span data-testid={ `${index}-horizontal-name` }>{recipe.name}</span>
          {/* <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.category}
          </span> */}
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneData}
          </span>
          <span>
            {recipe.alcoholicOrNot}
          </span>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ copyLinkRecipe }
          >
            <img src={ shareIcon } alt={ shareIcon } />

          </button>
          {getTags(recipe, index)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </section>

      <section>
        {doneRecipes && doneRecipes.length > 0
        && doneRecipes.map((recipe, index) => {
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
