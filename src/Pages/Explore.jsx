import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explore() {
  const history = useHistory();

  function handleButtonExplore({ target }) {
    const { name } = target;
    switch (name) {
    case 'explore-foods':
      history.push('/explore/foods');
      break;
    case 'explore-drinks':
      history.push('/explore/drinks');
      break;
    default:
      return null;
    }
  }

  return (
    <div>
      <Header />
      <div>
        <button
          name="explore-foods"
          data-testid="explore-foods"
          type="button"
          onClick={ handleButtonExplore }
        >
          Explore Foods
        </button>
        <button
          name="explore-drinks"
          data-testid="explore-drinks"
          type="button"
          onClick={ handleButtonExplore }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
