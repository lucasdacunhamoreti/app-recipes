import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';
import SearchMenu from './SearchMenu';

function Header() {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  // const [showSearch, setShowSearch] = useState(true);

  const handleShowInput = () => setShowInput(!showInput);

  const handleProfile = () => {
    history.push('/profile');
  };

  return (
    <header className="header">
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ handleProfile }
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
        onClick={ handleShowInput }
      >
        <img src={ imgSearch } alt="Search" />
      </button>

      { showInput && <SearchMenu /> }

    </header>);
}

export default Header;
