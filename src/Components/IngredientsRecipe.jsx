import PropTypes from 'prop-types';
import React from 'react';

export default function IngredientsRecipe({ recipe }) {
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

IngredientsRecipe.prototypes = {
  recipe: PropTypes.string,
}.isRequired;
