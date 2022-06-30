import React from 'react';
import Header from '../Components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </div>

      <div>
        <img data-testid={ `${index}-horizontal-image` } src={ img } alt="" />
        <span data-testid={ `${index}-horizontal-top-text` }>Categoria</span>
        <span data-testid={ `${index}-horizontal-name` }>Nome da Receita</span>
        <span data-testid={ `${index}-horizontal-done-date` }>Data</span>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          type="button"
        >
          Compartilhar
        </button>
        <span data-testid={ `${index}-${tagName}-horizontal-tag` }>tags</span>
      </div>
    </div>
  );
}

export default DoneRecipes;
