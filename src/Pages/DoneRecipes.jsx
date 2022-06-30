import React, { useState } from 'react';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [alertCopyboard, setAlertCopyboard] = useState(false);

  const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
  localDone.forEach((local) => console.log('local', local));

  function copyLinkRecipe() {
    if (!alertCopyboard) {
      copy(`http://localhost:3000/foods/${id}`);
    }
    setAlertCopyboard(true);
  }

  return (
    <div>
      <Header />
      <section>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </section>

      <section>
        {localDone.map((recipe, index) => {
          const { tags } = recipe;
          const tagList = [];
          if (typeof (tags) === 'string') {
            tagList.push(tags?.split(','));
          }
          return (
            <div key={ index }>
              <div>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt=""
                />
                <span data-testid={ `${index}-horizontal-name` }>{recipe.name}</span>
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.category}
                </span>
                <span
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneData}
                </span>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ copyLinkRecipe }
                >
                  <img src={ shareIcon } alt={ shareIcon } />

                </button>

                { tagList.length > 0
                  ? tagList.map((tag, tagIndex) => {
                    if (tagIndex < 2) {
                      return (
                        <span
                          key={ index + index }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {tag}
                        </span>
                      );
                    }
                    return ('');
                  })
                  : (
                    <span
                      key={ index + index }
                      data-testid={ `${index}-${'Pasta'}-horizontal-tag` }
                    />)}
              </div>
            </div>);
        })}
      </section>
    </div>
  );
}

export default DoneRecipes;
