import React, { useContext } from 'react';
// import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';

function Drinks() {
  const history = useHistory();
  const {
    // dataApiFoods,
    // setDataApiFoods,
    dataApiDrinks,
    // setDataApiDrinks,
  } = useContext(RecipesContext);

  const handleResponse = () => {
    if (dataApiDrinks.length === 1) {
      console.log(dataApiDrinks);
      const { idDrink } = dataApiDrinks[0];
      history.push(`/foods/${idDrink}`);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

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
        ))) : handleResponse()}
    </div>
  );
}

export default Drinks;
