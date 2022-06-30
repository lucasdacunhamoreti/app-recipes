import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function ExploreFoods() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button data-testid="explore-surprise" type="button">
        Surprise me!
      </button>

      <Footer />
    </div>
  );
}

export default ExploreFoods;
