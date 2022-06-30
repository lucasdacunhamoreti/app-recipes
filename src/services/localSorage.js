export const verifyRecipe = (local, id) => local?.some((e) => e.id === id);

export default function setDoneFoodRecipe(recipe) {
  // console.log('recipe', recipe);
  const data = new Date();
  const doneRecipe = {
    id: recipe.idMeal,
    type: 'food',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
    doneDate: data.toLocaleDateString(),
    tags: recipe.strTags,
  };
  // console.log('doneRecipe out', doneRecipe);
  const doneRecipeString = JSON.stringify([doneRecipe]);
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', doneRecipeString);
  } else {
    // console.log('doneRecipe else', doneRecipe);
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    // console.log('veri', verifyRecipe(local, doneRecipe.id));
    // console.log('veri', doneRecipe.id);
    // console.log('local', local);
    if (!(verifyRecipe(local, doneRecipe.id))) {
      // console.log('doneRecipe in', doneRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRecipe]));
    }
  }
}
export function setDoneDrinkRecipe(recipe) {
  console.log('recipe', recipe);
  const data = new Date();
  const doneRecipe = {
    id: recipe.idDrink,
    type: 'drink',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: data.toLocaleDateString(),
    tags: recipe.strTags,
  };
  // console.log('doneRecipe out', doneRecipe);
  const doneRecipeString = JSON.stringify([doneRecipe]);
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', doneRecipeString);
  } else {
    // console.log('doneRecipe else', doneRecipe);
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    // console.log('veri', verifyRecipe(local, doneRecipe.id));
    // console.log('veri', doneRecipe.id);
    // console.log('local', local);
    if (!(verifyRecipe(local, doneRecipe.id))) {
      // console.log('doneRecipe in', doneRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRecipe]));
    }
  }
}
