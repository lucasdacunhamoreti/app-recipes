import React, { useContext, useEffect } from 'react';
// import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import apiDrinks from '../services/dataDrinks';
import RecipesContext from '../Context/RecipesContext';
import Footer from '../Components/Footer';

function Drinks() {
  const history = useHistory();
  const {
    dataApiDrinks,
    setDataApiDrinks,
  } = useContext(RecipesContext);

  const handleResponse = () => {
    const { idDrink } = dataApiDrinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  useEffect(() => {
    async function fetch() {
      const returnApiDrinks = await apiDrinks('name-ingredient', '');
      setDataApiDrinks(returnApiDrinks.drinks);
    }
    fetch();
  }, [setDataApiDrinks]);

  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div>
      <Header />
      {/* {console.log(dataApiDrinks)} */}
      {dataApiDrinks.length === 1 ? handleResponse()
        : dataApiDrinks.map((drink, index) => (
        // console.log(drink)
          (index < MAX_QUANTITY_RECIPES)
        && (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrinkThumb }
            />
            <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
            {/* {console.log(drink)} */}
          </div>)
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
