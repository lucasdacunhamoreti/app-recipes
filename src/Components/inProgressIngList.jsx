import PropTypes from 'prop-types';
import React from 'react';

function InProgressIngList({ recipe }) {
  console.log('recipe', recipe);
  // let ingredients;
  // let measure;

  // function populateIngredientsCheckedList(recipe) {
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

  // if (recipe) {
  //   ingredients = filterIngredientsAndMeasures(recipe, 'strIngredient');
  //   measure = filterIngredientsAndMeasures(recipe, 'strMeasure');
  // }

  console.log(ingredients);
  console.log(measure);

  // defaultProps = {
  //   checked: false,
  // };
  // return (<div>inProgressIngList</div>);

  return (ingredients.map((item, index) => (
    <div key={ index }>
      <input
        id={ index }
        type="checkbox"
        name={ item }
        // checked={ () => isChecked(item) }
        // checked={ true }
        data-testid={ `${index}-ingredient-name-and-measure` }
        // onChange={ listProgressChange }
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

InProgressIngList.prototypes = {
  recipe: PropTypes.string,
}.isRequired;

export default InProgressIngList;
