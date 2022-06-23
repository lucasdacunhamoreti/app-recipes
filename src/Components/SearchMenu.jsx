import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import apiFoods from '../services/dataFoods';
import apiDrinks from '../services/dataDrinks';
import './SearchMenu.css';
// import { useEffect } from 'react';

export default function SearchMenu() {
  const history = useHistory();

  const [searched, setSearched] = useState('');
  const [searchType, setSearchType] = useState('');
  const [verifyInput, setVerifyInput] = useState(false);

  const {
    // dataApiFoods,
    setDataApiFoods,
    // dataApiDrinks,
    setDataApiDrinks,
    setTypeFilter,
  } = useContext(RecipesContext);

  const verifyFirstLetter = () => {
    if (verifyInput === true && searched.length > 0) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleGetApi = async () => {
    setTypeFilter('input');
    if (history.location.pathname === '/foods') {
      const returnApiFoods = await apiFoods(searchType, searched);
      // console.log(returnApiFoods.meals);
      // console.log('handle');
      if (!returnApiFoods.meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        setDataApiFoods(returnApiFoods.meals);
      }
    } else {
      const returnApiDrinks = await apiDrinks(searchType, searched);
      if (!returnApiDrinks.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        setDataApiDrinks(returnApiDrinks.drinks);
      }
    }
  };

  const inputHandleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'search-input') {
      setSearched(value);
      if (verifyInput) {
        verifyFirstLetter();
      }
    } else {
      if (value === 'first-letter') {
        setVerifyInput(true);
        verifyFirstLetter();
      } else {
        setVerifyInput(false);
      }
      setSearchType(value);
    }
  };

  return (
    <div className="search-menu">
      <input
        className="search-input"
        onChange={ inputHandleChange }
        value={ searched }
        name="search-input"
        data-testid="search-input"
        type="text"
        placeholder="search"
      />
      <div className="filter-container">
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

    </div>
  );
}
