const apiDrinks = async (type, search) => {
  if (type === 'ingredient') {
    const apiIngredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
    const apiIngredientsJson = await apiIngredients.json();
    return apiIngredientsJson;
  } if (type === 'name-ingredient') {
    const apiName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const apiNameJson = await apiName.json();
    return apiNameJson;
  }
  const apiFirstLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
  const apiFirstLetterJson = await apiFirstLetter.json();
  return apiFirstLetterJson;
};

export default apiDrinks;
