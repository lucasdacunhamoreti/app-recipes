import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';
import SearchMenu from './SearchMenu';

function Header() {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => setShowInput(!showInput);

  const handleProfile = () => {
    history.push('/profile');
  };

  function setTitle() {
    switch (history.location.pathname) {
    case '/foods':
      return 'Foods';
    case '/profile':
      return 'Profile';
    case '/drinks':
      return 'Drinks';
    case '/explore':
      return 'Explore';
    case '/explore/foods':
      return 'Explore Foods';
    case '/explore/foods/ingredients':
      return 'Explore Ingredients';
    case '/explore/drinks':
      return 'Explore Drinks';
    case '/explore/drinks/ingredients':
      return 'Explore Ingredients';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    case '/explore/drinks/nationalities':
      return 'Explore Nationalities';
    case '/explore/foods/nationalities':
      return 'Explore Nationalities';
    default: return 'error';
    }
  }

  return (
    <header className="header">
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ handleProfile }
        src={ imgProfile }
      >
        <img src={ imgProfile } alt="Profile" />
      </button>

      <p
        data-testid="page-title"
      >
        { setTitle() }
      </p>

      { showInput && <SearchMenu /> }

      { (history.location.pathname !== '/profile')
        && (history.location.pathname !== '/explore')
        && (history.location.pathname !== '/explore/foods')
        && (history.location.pathname !== '/explore/drinks')
        && (history.location.pathname !== '/explore/foods/ingredients')
        && (history.location.pathname !== '/explore/drinks/ingredients')
        && (history.location.pathname !== '/done-recipes')
        && (history.location.pathname !== '/favorite-recipes') === true ? (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ handleShowInput }
            src={ imgSearch }
          >
            <img src={ imgSearch } alt="Search" />
          </button>
        ) : null}
    </header>);
}

export default Header;
