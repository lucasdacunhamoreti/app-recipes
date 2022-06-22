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
    if (history.location.pathname === '/foods') return 'Foods';
    if (history.location.pathname === '/profile') return 'Profile';
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
        && (history.location.pathname !== '/explore/foods/ingredients')
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
