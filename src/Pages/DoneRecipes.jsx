import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../Components/Header';
// import { useParams } from 'react-router-dom';

function DoneRecipes() {
  // const [isFavorited, setIsFavorited] = useState(false);
  // const [alertCopyboard, setAlertCopyboard] = useState(false);
  // const { id } = useParams();

  const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
  // const localDone = (localStorage.getItem('doneRecipes'));
  localDone.forEach((local) => console.log('local', local));

  return (
    <div>
      <Header />
      <section>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </section>

      <section>
        {/* {localDone.map((recipe, index) => { */}
        {localDone.map((recipe, index) => {
          const { tags } = recipe;
          const tagList = [];
          if (typeof (tags) === 'string') {
            tagList.push(tags?.split(','));
          }
          // console.log(tags);
          console.log(tagList);
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
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                >
                  Compartilhar
                </button>

                { tagList
                  ? tagList.map((tag) => {
                    console.log(tag);
                    return (
                      <span
                        key={ index + index }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </span>
                    );
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

// DoneRecipes.propTypes = {
//   recipe: PropTypes.arrayOf.isRequired,
// };

export default DoneRecipes;
