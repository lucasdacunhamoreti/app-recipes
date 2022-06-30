// import React from 'react';
// import PropTypes from 'prop-types';
// import Header from './Header';
// // import { useParams } from 'react-router-dom';

// function DoneRecipes({ recipe }) {
//   // const [isFavorited, setIsFavorited] = useState(false);
//   // const [alertCopyboard, setAlertCopyboard] = useState(false);
//   // const { id } = useParams();
//   function handleDone() {
//     const doneRecipes = {
//       id: '',
//       type: '',
//       nationality: '',
//       category: '',
//       alcoholicOrNot: '',
//       name: '',
//       image: '',
//       doneDate: '',
//       tags: '',
//     };

//     const doneRecipeString = JSON.stringify([doneRecipes]);
//     if (!localStorage.getItem('doneRecipes')) {
//       localStorage.setItem('doneRecipes', doneRecipeString);
//       // setIsFavorited(true);
//     } else {
//       const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
//     }
//     return (
//       <div>
//         <Header />
//         <div>
//           <button data-testid="filter-by-all-btn" type="button">All</button>
//           <button data-testid="filter-by-food-btn" type="button">Food</button>
//           <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
//         </div>

//         <div>
//           <img data-testid={ `${index}-horizontal-image` } src={ img } alt="" />
//           <span data-testid={ `${index}-horizontal-top-text` }>Categoria</span>
//           <span data-testid={ `${index}-horizontal-name` }>Nome da Receita</span>
//           <span data-testid={ `${index}-horizontal-done-date` }>Data</span>
//           <button
//             data-testid={ `${index}-horizontal-share-btn` }
//             type="button"
//           >
//             Compartilhar
//           </button>
//           <span data-testid={ `${index}-${tagName}-horizontal-tag` }>tags</span>
//         </div>
//       </div>
//     );
//   }
// }

// DoneRecipes.propTypes = {
//   recipe: PropTypes.arrayOf.isRequired,
// };

// export default DoneRecipes;
