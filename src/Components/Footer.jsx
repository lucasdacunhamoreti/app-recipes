import React from 'react';
import { Link } from 'react-router-dom';
import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Food from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div
      className="container"
      data-testid="footer"
    >
      <Link to="/drinks">
        <button
          src={ Drinks }
          type="button"
          data-testid="drinks-bottom-btn"
        >
          <img alt="drinks" src={ Drinks } />

        </button>
      </Link>
      <Link to="/explore">
        <button
          src={ Explore }
          type="button"
          data-testid="explore-bottom-btn"
        >
          <img alt="drinks" src={ Explore } />
        </button>
      </Link>
      <Link to="/foods">
        <button
          src={ Food }
          type="button"
          data-testid="food-bottom-btn"
        >
          <img alt="drinks" src={ Food } />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
