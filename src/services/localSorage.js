const verifyRecipe = (local, id) => local.some((e) => e === id);

export default function setDoneFoodRecipe(recipe) {
  console.log('recipe', recipe);
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
  console.log('doneRecipe', doneRecipe);
  const doneRecipeString = JSON.stringify([doneRecipe]);
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', doneRecipeString);
  } else {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    if (verifyRecipe(local, doneRecipe.id)) {
      localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRecipe]));
    }
  }
}
