import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.scss';

function Home(): JSX.Element {
  return (
    <div id={'home-container'}>
      <iframe
        id='b1a3cd5e-2ccd-4d2c-b37f-6598907b8b9a'
        src='https://www.vectary.com/viewer/v1/?model=b1a3cd5e-2ccd-4d2c-b37f-6598907b8b9a&env=teufelsbergroof&turntable=2&showInteractionPrompt=0'
        frameBorder='0'/>
      <Link to='/story1'>
        <div id={'start-button'}>
          START
        </div>
      </Link>
    </div>
  );
}

export default Home;