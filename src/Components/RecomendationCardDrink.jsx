import React, { useState, useEffect } from 'react';

import { getRecomendedCardFood } from '../services/dataDrinks';

export default function RecomendationCardDrink() {
  const [recommended, setRecommended] = useState([]);

  function setRecommendedCard() {
    return (
      <div>
        <h1>Recommended</h1>
        <div className="recomended-card-container">
          {recommended.map((food, index) => (
            <div
              key={ index }
              className="recomended-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ food.strMealThumb }
                alt={ food.strMealThumb }
              />
              <span>{ food.strCategory }</span>
              <span data-testid={ `${index}-recomendation-title` }>
                { food.strMeal}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  useEffect(() => {
    async function fetch() {
      const result = await getRecomendedCardFood();
      setRecommended(result);
    }
    fetch();
  }, []);

  return (
    <div>
      <div className="recommended-card">
        {setRecommendedCard()}
      </div>
    </div>
  );
}
