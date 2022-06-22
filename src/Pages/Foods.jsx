import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';

function Foods() {
  const history = useHistory();
  const {
    dataApiFoods,
    // setDataApiFoods,
    // dataApiDrinks,
    // setDataApiDrinks,
  } = useContext(RecipesContext);

  // FALTA FAZER MENSAGEM DE ERRO CASO NAO ENCONTRE NENHUMA RECEITA!!!!!
  // ALERT

  const handleResponse = () => {
    if (dataApiFoods.length === 1) {
      console.log(dataApiFoods);
      const { idFood } = dataApiFoods[0];
      history.push(`/foods/${idFood}`);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

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
            { console.log(dataApiFoods) }
          </div>
        ))) : handleResponse()}
    </div>
  );
}

export default Foods;
