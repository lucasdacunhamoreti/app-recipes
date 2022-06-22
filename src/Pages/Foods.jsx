import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';
import apiFoods from '../Components/services/dataFoods';

function Foods() {
  const history = useHistory();
  const {
    dataApiFoods,
    setDataApiFoods,
    // dataApiDrinks,
    // setDataApiDrinks,
  } = useContext(RecipesContext);
  // const [foodsSerch, setFoodsSerch] = useState([]);

  // FALTA FAZER MENSAGEM DE ERRO CASO NAO ENCONTRE NENHUMA RECEITA!!!!!
  // ALERT

  const handleResponse = () => {
    const { idMeal } = dataApiFoods[0];
    // console.log(dataApiFoods);
    history.push(`/foods/${idMeal}`);
  };

  useEffect(() => {
    // console.log(apiFoods);
    async function fetch() {
      const returnApiFoods = await apiFoods('name-ingredient', '');
      setDataApiFoods(returnApiFoods.meals);
    }
    fetch();
  }, [setDataApiFoods]);

  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div>
      <Header />
      {dataApiFoods.length === 1 ? handleResponse()
        : dataApiFoods.map((food, index) => (
          (index < MAX_QUANTITY_RECIPES)
        && (
          <div
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
    </div>
  );
}

export default Foods;
