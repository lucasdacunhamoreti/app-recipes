const apiDrinks = async (type, search) => {
  if (type === 'ingredient') {
    const apiIngredients = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
    );
    const apiIngredientsJson = await apiIngredients.json();
    return apiIngredientsJson;
  }
  if (type === 'name-ingredient') {
    const apiName = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`,
    );
    const apiNameJson = await apiName.json();
    return apiNameJson;
  }
  const apiFirstLetter = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`,
  );
  const apiFirstLetterJson = await apiFirstLetter.json();
  return apiFirstLetterJson;
};

export const getCategoryDrinks = async () => {
  const MAX_QUANTITY_CATEGORY = 5;
  const apiCategory = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  );
  const apiCategoryJson = await apiCategory.json();
  return apiCategoryJson.drinks.slice(0, MAX_QUANTITY_CATEGORY);
};

export const getDrinksCategorySpecify = async (drink) => {
  const MAX_QUANTITY_CATEGORY = 12;
  const apiCategory = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`,
  );
  const apiCategoryJson = await apiCategory.json();
  return apiCategoryJson.drinks.slice(0, MAX_QUANTITY_CATEGORY);
};

export const getRecipeDrinks = async (id) => {
  const apiCategory = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const apiCategoryJson = await apiCategory.json();
  return apiCategoryJson.drinks;
};

export const getRecomendedCardFood = async () => {
  const MAX_QUANTITY = 6;
  const apiResponse = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const apiResponseJson = await apiResponse.json();
  return apiResponseJson.meals.slice(0, MAX_QUANTITY);
};

export const getRandomRecipeDrinks = async () => {
  const apiCategory = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  );
  const apiCategoryJson = await apiCategory.json();
  return apiCategoryJson.drinks;
};

export default apiDrinks;
