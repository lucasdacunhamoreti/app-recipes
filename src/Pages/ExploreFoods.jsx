import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { getRandomRecipeFoods } from '../services/dataFoods';

function ExploreFoods() {
  const history = useHistory();

  const acessRandomRecipe = async () => {
    const apiFoodsCategory = await getRandomRecipeFoods();
    return apiFoodsCategory;
  };

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

export default ExploreFoods;
