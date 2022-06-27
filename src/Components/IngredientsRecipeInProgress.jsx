import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function IngredientsRecipeInProgress({ recipe }) {
  // console.log('recipe', recipe);
  const { id } = useParams();
  // const history = useHistory();
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const [inProgressRecipe, setInProgressRecipe] = useState(
    local?.meals?.[id] || [],
  );

  function recipeInProgress() {
    if (local) {
      const objs = Object.values(local);
      const recipeList = objs.reduce((acc, curr) => {
        acc.meals = { ...curr, [id]: inProgressRecipe };
        return acc;
      }, { meals: '' }, { cocktails: '' });
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeList));
    } else {
      const recipeList = { meals: { [id]: inProgressRecipe } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeList));
    }
  }

  function listProgressChange({ target }) {
    if (target.checked) {
      setInProgressRecipe([...inProgressRecipe, target.name]);
    } else {
      setInProgressRecipe(inProgressRecipe.filter((recipeI) => recipeI !== target.name));
    }
    recipeInProgress();
    // setIsChecked(!isChecked);
  }

  function isChecked(name) {
    let result = false;
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      // const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const objs = Object.values(local);
      objs.forEach((chave) => {
        Object.entries(chave).forEach(([key, value]) => {
          if (key === id) {
            // console.log(name);
            // console.log('value', value);
            if (value.includes(name)) {
              // console.log('return true');
              result = true;
              // setInProgressRecipe([...inProgressRecipe, name]);
              // return true;
            }
            // console.log('return false');
            // return false;
          }
        });
      });
    }
    // console.log('result', result);
    // setInProgressRecipe([inProgressRecipe]);
    return result;
    // console.log('saiu com return false');
    // return false;
  }

  function filterIngredientsAndMeasures(recipeIten, str) {
    const result = Object.entries(recipeIten)
      .map(([key, value]) => {
        if (key.includes(str)) {
          return value;
        }
        return '';
      })
      .filter((arr) => arr !== '' && arr !== null && arr !== ' ');
    return result;
  }
  const ingredients = filterIngredientsAndMeasures(recipe, 'strIngredient');
  const measure = filterIngredientsAndMeasures(recipe, 'strMeasure');

  // console.log(ingredients);
  // console.log(measure);

  // defaultProps = {
  //   checked: false,
  // };

  return (ingredients.map((item, index) => (
    <div key={ index }>
      <input
        id={ index }
        type="checkbox"
        name={ item }
        // checked={ () => isChecked(item) }
        // checked={ true }
        data-testid={ `${index}-ingredient-name-and-measure` }
        onChange={ listProgressChange }
        // checked={ isChecked(item) }
        checked={ () => inProgressRecipe.includes(item) }
        // onClick={ isChecked(item) }
        // onClick={ (event) => isChecked(recipe, event) }
      />
      <label htmlFor={ index }>
        { measure[index]
          ? `${ingredients[index]} - ${measure[index]}`
          : `${ingredients[index]}`}
      </label>
    </div>))
  );
}

IngredientsRecipeInProgress.prototypes = {
  recipe: PropTypes.string,
}.isRequired;

export default IngredientsRecipeInProgress;
