import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// merge

import
apiFoods,
{ getCategoryFoods, getFoodsCategorySpecify } from '../services/dataFoods';

import
apiDrinks,
{ getCategoryDrinks, getDrinksCategorySpecify } from '../services/dataDrinks';

import RecipesContext from '../Context/RecipesContext';

export default function Category() {
  const history = useHistory();

  const {
    setDataApiFoods,
    setDataApiDrinks,
    setTypeFilter,
  } = useContext(RecipesContext);

  const [category, setCategory] = useState([]);
  const [buttonClicked, setButtonClicked] = useState('');

  useEffect(() => {
    if (history.location.pathname === '/foods') {
      const fetchCategoryFoods = async () => {
        const returnCategoryFoods = await getCategoryFoods();
        setCategory(returnCategoryFoods);
      };
      fetchCategoryFoods();
    } else {
      const fetchCategoryDrinks = async () => {
        const returnCategoryDrinks = await getCategoryDrinks();
        setCategory(returnCategoryDrinks);
      };
      fetchCategoryDrinks();
    }
  }, [history.location.pathname]);

  const handleButtonCategory = ({ target }) => {
    setTypeFilter('filter');
    const { value } = target;
    if (history.location.pathname === '/foods') {
      const fetchFoods = async () => {
        if (value !== buttonClicked && value !== 'All') {
          const returnApiFoods = await getFoodsCategorySpecify(value);
          setButtonClicked(value);
          setDataApiFoods(returnApiFoods);
        } else {
          const returnApiFoods = await apiFoods('name-ingredient', '');
          setDataApiFoods(returnApiFoods.meals);
          setButtonClicked('');
        }
      };
      fetchFoods();
    } else {
      const fetchDrinks = async () => {
        if (value !== buttonClicked && value !== 'All') {
          const returnApiDrinks = await getDrinksCategorySpecify(value);
          setButtonClicked(value);
          setDataApiDrinks(returnApiDrinks);
        } else {
          const returnApiDrinks = await apiDrinks('name-ingredient', '');
          setDataApiDrinks(returnApiDrinks.drinks);
          setButtonClicked('');
        }
      };
      fetchDrinks();
    }
  };

  return (
    <div>
      <button
        value="All"
        data-testid="All-category-filter"
        type="button"
        onClick={ handleButtonCategory }
      >
        All
      </button>
      { category.map((item) => (
        <button
          key={ item.strCategory }
          data-testid={ `${item.strCategory}-category-filter` }
          type="button"
          value={ item.strCategory }
          onClick={ handleButtonCategory }
        >
          { item.strCategory }

        </button>)) }
    </div>
  );
}
