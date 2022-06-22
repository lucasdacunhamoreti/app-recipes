import React, { useContext } from 'react';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';

function Drinks() {
  const {
    // dataApiFoods,
    // setDataApiFoods,
    dataApiDrinks,
    // setDataApiDrinks,
  } = useContext(RecipesContext);

  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div>
      <Header />
      {dataApiDrinks.length > 1 ? (
        dataApiDrinks.slice(0, MAX_QUANTITY_RECIPES).map((item, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img data-testid={ `${index}-card-img` } src={ item.strDrinkThumb } alt="" />
            <span data-testid={ `${index}-card-name` }>{ item.strDrink }</span>
          </div>
        ))) : null}
    </div>
  );
}

export default Drinks;
