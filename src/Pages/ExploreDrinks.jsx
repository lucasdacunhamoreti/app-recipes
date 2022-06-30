import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getRandomRecipeDrinks } from '../services/dataDrinks';

function ExploreDrinks() {
  const history = useHistory();

  const acessRandomRecipe = async () => {
    const apiDrinksCategory = await getRandomRecipeDrinks();
    history.push(`/drinks/${apiDrinksCategory[0].idDrink}`);
  };

  return (
    <div>
      <Header />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => history.push('/explore/drinks/nationalities') }
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ acessRandomRecipe }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
