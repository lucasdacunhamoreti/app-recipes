import React, { useState, useEffect } from 'react';

import { getRecomendedCardDrink } from '../services/dataFoods';

export default function RecomendationCardFood() {
  const [recommended, setRecommended] = useState([]);

  function setRecommendedCard() {
    return (
      <>
        <h1>Recommended</h1>
        <div className="card-container">
          {recommended.map((drink, index) => (
            <div
              key={ index }
              className="recomended-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrinkThumb }
              />
              <span>{ drink.strAlcoholic }</span>
              <span data-testid={ `${index}-recomendation-title` }>
                { drink.strDrink }
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }

  useEffect(() => {
    async function fetch() {
      const result = await getRecomendedCardDrink();
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
