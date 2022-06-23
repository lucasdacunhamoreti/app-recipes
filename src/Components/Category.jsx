import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getCategoryFoods, getFoodsCategorySpecify } from '../services/dataFoods';
import { getCategoryDrinks, getDrinksCategorySpecify } from '../services/dataDrinks';
import RecipesContext from '../Context/RecipesContext';

export default function Category() {
  const history = useHistory();

  const {
    setDataApiFoods,
    setDataApiDrinks,
    setTypeFilter,
  } = useContext(RecipesContext);

  const [category, setCategory] = useState([]);

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

  // CONSERTAR: O ULTIMO BOTÃO DE BUSCA ESTÁ FALHANDO PELO FATO DA LOGICA DA TELA PRINCIPAL

  const handleButtonCategory = ({ target }) => {
    setTypeFilter('filter');
    const { value } = target;
    if (history.location.pathname === '/foods') {
      const fetchFoods = async () => {
        const returnApiFoods = await getFoodsCategorySpecify(value);
        console.log(returnApiFoods);
        setDataApiFoods(returnApiFoods);
      };
      fetchFoods();
    } else {
      const fetchDrinks = async () => {
        const returnApiFoods = await getDrinksCategorySpecify(value);
        setDataApiDrinks(returnApiFoods);
      };
      fetchDrinks();
    }
  };

  return (
    <div>
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
