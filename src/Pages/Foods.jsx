import React, { useContext } from 'react';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';

function Foods() {
  const {
    dataApiFoods,
    // setDataApiFoods,
    // dataApiDrinks,
    // setDataApiDrinks,
  } = useContext(RecipesContext);

  // FALTA FAZER MENSAGEM DE ERRO CASO NAO ENCONTRE NENHUMA RECEITA!!!!!
  // ALERT

  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div>
      <Header />
      {dataApiFoods.length > 1 ? (
        dataApiFoods.slice(0, MAX_QUANTITY_RECIPES).map((item, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMealThumb }
            />
            <span data-testid={ `${index}-card-name` }>{ item.strMeal }</span>
          </div>
        ))) : null}
    </div>
  );
}

export default Foods;
