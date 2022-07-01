import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../Components/Header';
import apiDrinks from '../services/dataDrinks';
import RecipesContext from '../Context/RecipesContext';
import Footer from '../Components/Footer';
import Category from '../Components/Category';

import './Foods.css';
import './Card.css';

function Drinks() {
  const history = useHistory();
  const {
    dataApiDrinks,
    setDataApiDrinks,
    typeFilter,
    exploreSearch,
  } = useContext(RecipesContext);

  const handleResponse = () => {
    const { idDrink } = dataApiDrinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  useEffect(() => {
    if (!exploreSearch.isCameExplore) {
      const fetch = async () => {
        const returnApiDrinks = await apiDrinks('name-ingredient', '');
        setDataApiDrinks(returnApiDrinks.drinks);
      };
      fetch();
    } else {
      const fetch2 = async () => {
        const returnApiDrinks = await
        apiDrinks('ingredient', exploreSearch.nameIngredient);
        setDataApiDrinks(returnApiDrinks.drinks);
      };
      fetch2();
    }
  }, []);

  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div className="foods">
      <Header />
      <Category />
      {dataApiDrinks.length === 1 && typeFilter === 'input' ? handleResponse()
        : dataApiDrinks.map((drink, index) => (
          (index < MAX_QUANTITY_RECIPES)
        && (
          <Link key={ index } to={ `/drinks/${drink.idDrink}` }>
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
            >
              <div className="card-container">
                <div className="card-img-conainer">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrinkThumb }
                  />
                </div>
                <div className="card-name-conainer">
                  <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
                </div>
              </div>
            </div>
          </Link>)

        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
