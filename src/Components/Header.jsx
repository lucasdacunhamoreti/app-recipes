import React from 'react';
// import imgProfile from 'src/images/profileIcon.svg'
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';

function Header() {
  return (
    <div className="header">
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
    </div>);
}

export default Header;
