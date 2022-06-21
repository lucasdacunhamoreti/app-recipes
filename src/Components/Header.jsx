import React from 'react';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';
// import RecipesContext from '../Context/RecipesContext';

function Header() {
  return (
    <header className="header">
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src={ imgProfile } alt="Profile" />
      </button>
      <p
        data-testid="page-title"
      >
        Foods
      </p>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src={ imgSearch } alt="Search" />
      </button>
    </header>);
}

export default Header;
