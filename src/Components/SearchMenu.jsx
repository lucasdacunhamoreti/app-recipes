import React, { useState } from 'react';
// import RecipesContext from '../Context/RecipesContext';
import { useHistory } from 'react-router-dom';
import apiFoods from './services/dataFoods';
import apiDrinks from './services/dataDrinks';

export default function SearchMenu() {
  const history = useHistory();
  const [searched, setSearched] = useState('');
  const [searchType, setSearchType] = useState('');
  const [letterSelect, setLetterSelect] = useState(false);

  const verifyFirstLetter = () => {
    if (letterSelect === true && searched.length > 0) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleGetApi = async () => {
    if (history.location.pathname === '/foods') {
      const teste = await apiFoods(searchType, searched);
      console.log(teste);
    } else {
      const teste2 = await apiDrinks(searchType, searched);
      console.log(teste2);
    }
  };

  const inputHandleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'search-input') {
      setSearched(value);
      if (letterSelect) {
        verifyFirstLetter();
      }
    } else {
      if (value === 'first-letter') {
        setLetterSelect(true);
        verifyFirstLetter();
      } else {
        setLetterSelect(false);
      }
      setSearchType(value);
    }
  };

  return (
    <div>
      <input
        onChange={ inputHandleChange }
        value={ searched }
        name="search-input"
        data-testid="search-input"
        type="text"
        placeholder="search"
      />

      <label htmlFor="ingredient">
        Ingredients
        <input
          id="ingredient"
          name="radioSearch"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          onChange={ inputHandleChange }
        />

      </label>

      <label htmlFor="name-ingredient">
        Name
        <input
          name="radioSearch"
          id="name-ingredient"
          data-testid="name-search-radio"
          type="radio"
          value="name-ingredient"
          onChange={ inputHandleChange }
        />
      </label>

      <label htmlFor="first-letter">
        First Letter
        <input
          name="radioSearch"
          id="first-letter"
          data-testid="first-letter-search-radio"
          type="radio"
          value="first-letter"
          onChange={ inputHandleChange }
        />
      </label>
      <button
        onClick={ handleGetApi }
        data-testid="exec-search-btn"
        type="button"
      >
        Search

      </button>
    </div>
  );
}
