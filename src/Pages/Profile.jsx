import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const deleteItens = () => {
    localStorage.clear();
  };

  const email = JSON.parse(localStorage?.getItem('user'));

  return (
    <div>
      <Header />
      <b data-testid="profile-email">{email?.email}</b>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn" type="submit">
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn" type="submit">
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="submit"
          onClick={ deleteItens }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
