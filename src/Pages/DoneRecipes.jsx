import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../Context/RecipesContext';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const {
    doneRecipes,
  } = useContext(RecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);
  const [alertCopyboard, setAlertCopyboard] = useState(false);

  // const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
  // if (localDone) {
  //   localDone.forEach((local) => console.log('local', local));
  // }

  const filterDoneRecipes = (recipe) => {
    // console.log('doneRecipes', doneRecipes);
    if (recipe === 'foods') {
      const foods = doneRecipes.filter((type) => type.type === 'food');
      setFilteredRecipes(foods);
      // console.log('foods', foods);
      // console.log(doneRecipes.filter((type) => type === 'food'));
    } else if (recipe === 'drinks') {
      const drinks = doneRecipes.filter((type) => type.type === 'drink');
      // console.log('drinks', drinks);
      setFilteredRecipes(drinks);
    } else {
      setFilteredRecipes(doneRecipes);
    }
  };
  // changeFilter(){
  // }

  function copyLinkRecipe(id) {
    if (!alertCopyboard) {
      copy(`http://localhost:3000/foods/${id}`);
    }
    setAlertCopyboard(true);
  }

  const getTags = (recipe, index) => {
    // console.log('getTags');
    const { tags } = recipe;
    let tagList = [];
    // console.log('tags', tags);
    if (typeof (tags) === 'object') {
      tagList = tags;
    }
    if (typeof (tags) === 'string') {
      tagList = tags.split(',');
    }
    // console.log('taglist', tagList);
    const myTags = [];
    if (tagList) {
      myTags.push(tagList[0]);
    }
    if (tagList) {
      myTags.push(tagList[1]);
    }
    // console.log('myTags', myTags);
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
          { alertCopyboard && <p>Link copied!</p>}
          <Link to={ `/foods/${recipe.id}` }>
            <img
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
            />
            <span data-testid={ `${index}-horizontal-name` }>{recipe.name}</span>
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

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyLinkRecipe(recipe.id) }
            src={ shareIcon }
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
          { alertCopyboard && <p>Link copied!</p>}
          <Link to={ `/drinks/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <span data-testid={ `${index}-horizontal-name` }>{recipe.name}</span>
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

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ copyLinkRecipe }
            src={ shareIcon }
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
