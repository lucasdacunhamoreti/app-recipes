export const verifyRecipe = (local, id) => local?.some((e) => e.id === id);

export default function setDoneFoodRecipe(recipe) {
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
  const doneRecipeString = JSON.stringify([doneRecipe]);
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', doneRecipeString);
  } else {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!(verifyRecipe(local, doneRecipe.id))) {
      localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRecipe]));
    }
  }
  setDoneRecipes(doneRecipeString);
}
export function setDoneDrinkRecipe(recipe) {
  const data = new Date();
  const doneRecipe = {
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: data.toLocaleDateString(),
    tags: recipe.strTags,
  };
  const doneRecipeString = JSON.stringify([doneRecipe]);
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', doneRecipeString);
  } else {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!(verifyRecipe(local, doneRecipe.id))) {
      localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRecipe]));
    }
  }
  setDoneRecipes(doneRecipeString);
}
