import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';
import apiFoods from '../services/dataFoods';
import Footer from '../Components/Footer';
import './Foods.css';
import './Card.css';
import Category from '../Components/Category';

function Foods() {
  const history = useHistory();
  const {
    dataApiFoods,
    setDataApiFoods,
    typeFilter,
    // dataApiDrinks,
    // setDataApiDrinks,
  } = useContext(RecipesContext);
  // const [foodsSerch, setFoodsSerch] = useState([]);

  const handleResponse = () => {
    const { idMeal } = dataApiFoods[0];
    // console.log(dataApiFoods);
    history.push(`/foods/${idMeal}`);
  };

  useEffect(() => {
    async function fetch() {
      const returnApiFoods = await apiFoods('name-ingredient', '');
      setDataApiFoods(returnApiFoods.meals);
    }
    fetch();
  }, [setDataApiFoods]);

  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div className="foods">
      <Header />
      <Category />
      {dataApiFoods.length === 1 && typeFilter === 'input' ? handleResponse()
        : dataApiFoods.map((food, index) => (
          (index < MAX_QUANTITY_RECIPES)
        && (
          <div
            className="card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMealThumb }
            />
            <span data-testid={ `${index}-card-name` }>{ food.strMeal }</span>
            {/* { console.log(food) } */}
          </div>)
        ))}
      <Footer />
    </div>
  );
}

export default Foods;
