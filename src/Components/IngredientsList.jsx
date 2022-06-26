import React from 'react';

// const UseRef = (props) => (
function IngredientsList(props) {
  // function populateIngredientsCheckedList(recipe) {
  const ingredients = filterIngredientsAndMeasures(recipe, 'strIngredient');
  const measure = filterIngredientsAndMeasures(recipe, 'strMeasure');

  defaultProps = {
    checked: false,
  };

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

export default IngredientsList;
