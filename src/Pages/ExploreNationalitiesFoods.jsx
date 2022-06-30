import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

import apiFoods, { getNationalities, getRecipesNationality } from '../services/dataFoods';

function ExploreNationalitiesFoods() {
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataFoods, setDataFoods] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getNationalities();
      setDataNationalities(data.meals);
    };
    fetch();
  }, []);

  useEffect(() => {
    const MAX_QUANTITY_ITEMS = 12;
    const getFoods = async () => {
      const data = await apiFoods('name-ingredient', '');
      setDataFoods(data.meals.slice(0, MAX_QUANTITY_ITEMS));
    };
    getFoods();
  }, []);

  function getCards({ target }) {
    if (target.value !== 'All-option') {
      const MAX_QUANTITY_ITEMS = 12;
      const getSelectedRecipe = async () => {
        const api = await getRecipesNationality(target.value);
        setDataFoods(api.meals.slice(0, MAX_QUANTITY_ITEMS));
      };
      getSelectedRecipe();
    } else {
      const MAX_QUANTITY_ITEMS = 12;
      const getFoods = async () => {
        const data = await apiFoods('name-ingredient', '');
        setDataFoods(data.meals.slice(0, MAX_QUANTITY_ITEMS));
      };
      getFoods();
    }
  }

  return (
    <div>
      <Header />
      <div>
        <select data-testid="explore-by-nationality-dropdown" onChange={ getCards }>
          <option data-testid="All-option" value="All-option" selected>
            All
          </option>
          { dataNationalities.map((nationality) => (
            <option
              key={ nationality.strArea }
              data-testid={ `${nationality.strArea}-option` }
              value={ nationality.strArea }
            >
              { nationality.strArea }
            </option>
          )) }
        </select>
      </div>

      { dataFoods.map((item, index) => (
        <Link key={ item.idMeal } to={ `/foods/${item.idMeal}` }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMealThumb }
            />
            <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
          </div>
        </Link>
      )) }

      <Footer />
    </div>
  );
}

export default ExploreNationalitiesFoods;
