import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import RecipesProvider from './Provider/RecipesProvider';

import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Drinks from './Pages/Drinks';
import Foods from './Pages/Foods';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreNationalitiesFoods from './Pages/ExploreNationalitiesFoods';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import FoodDetails from './Pages/FoodDetails';
import DrinkDetails from './Pages/DrinkDetails';
import ExploreNationalitiesDrinks from './Pages/ExploreNationalitiesDrinks';
import FoodInProgress from './Pages/FoodInProgress';
import DrinkInProgress from './Pages/DrinkInProgress';
import ExploreRecipesByIngredient from './Pages/ExploreRecipesByIngredient';

function App() {
  return (
    <RecipesProvider>
      <Router>
        <Switch>
          <Route exact component={ Login } path="/" />
          <Route exact component={ Foods } path="/foods" />
          <Route exact component={ Drinks } path="/drinks" />
          <Route exact component={ FoodDetails } path="/foods/:id" />
          <Route exact component={ DrinkDetails } path="/drinks/:id" />
          <Route exact component={ FoodInProgress } path="/foods/:id/in-progress" />
          <Route exact component={ DrinkInProgress } path="/drinks/:id/in-progress" />
          <Route exact component={ Explore } path="/explore" />
          <Route exact component={ ExploreFoods } path="/explore/foods" />
          <Route exact component={ ExploreDrinks } path="/explore/drinks" />
          <Route
            exact
            component={ ExploreRecipesByIngredient }
            path="/explore/foods/ingredients"
          />
          <Route
            exact
            component={ ExploreRecipesByIngredient }
            path="/explore/drinks/ingredients"
          />
          <Route
            exact
            component={ ExploreNationalitiesFoods }
            path="/explore/foods/nationalities"
          />
          <Route
            exact
            component={ ExploreNationalitiesDrinks }
            path="/explore/drinks/nationalities"
          />
          <Route exact component={ Profile } path="/profile" />
          <Route exact component={ DoneRecipes } path="/done-recipes" />
          <Route exact component={ FavoriteRecipes } path="/favorite-recipes" />
        </Switch>
      </Router>
    </RecipesProvider>
  );
}

export default App;
