import React from 'react';
// import RecipesContext from '../Context/RecipesContext';

export default function SearchMenu() {
  // const { searchRecipes, setSearchRecipe } = useContext(RecipesContext);

  return (
    <div>
      <input data-testid="search-input" type="text" placeholder="search" />
      <label htmlFor="ingredient">
        Ingredients
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
        />
      </label>

      <label htmlFor="name-ingredient">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          value="name-ingredient"
        />
      </label>

      <label htmlFor="first-letter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="first-letter"
        />
      </label>
      <button data-testid="exec-search-btn" type="button">Search</button>
    </div>
  );
}
