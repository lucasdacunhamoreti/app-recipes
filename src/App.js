import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={ Login } path="/" />

      </Switch>
    </Router>
  );
}

export default App;
