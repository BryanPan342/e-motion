import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.scss';

function Home(): JSX.Element {
  return (
    <div id={'home-container'}>
      <h1>Home Page</h1>
      <Link to={'/story1'}>Story 1</Link>
    </div>
  );
}

export default Home;