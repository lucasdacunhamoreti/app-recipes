import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Pages/Login';
import Foods from './Pages/Foods';
import RecipesProvider from './Provider/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <Router>
        <Switch>
          <Route exact component={ Login } path="/" />
          <Route exact component={ Foods } path="/foods" />
          <Route exact component={ Foods } path="/drinks" />
          <Route exact component={ Foods } path="/foods/:id" />
          <Route exact component={ Foods } path="/drinks/:id" />
          <Route exact component={ Foods } path="/foods/id/:in-progress" />
          <Route exact component={ Foods } path="/drinks/id/:in-progress" />
          <Route exact component={ Foods } path="/explore" />
          <Route exact component={ Foods } path="/explore/foods" />
          <Route exact component={ Foods } path="/explore/drinks" />
          <Route exact component={ Foods } path="/explore/foods/ingredients" />
          <Route exact component={ Foods } path="/explore/drinks/ingredients" />
          <Route exact component={ Foods } path="/explore/foods/nationalities" />
          <Route exact component={ Foods } path="/profile" />
          <Route exact component={ Foods } path="/done-recipes" />
          <Route exact component={ Foods } path="/favorite-recipes" />
        </Switch>
      </Router>
    </RecipesProvider>
  );
}

export default App;
