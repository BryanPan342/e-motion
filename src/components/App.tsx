import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Track from '../assets/audio/track.mp3';
import Home from './pages/Home';
import Story1 from './pages/Story1';

function App(): JSX.Element {
  const [mute, setMute] = useState(true);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (mute) return;
    const audio = new Audio(Track);
    audio.loop = true;
    audio.volume = .05;
    void audio.play();
  }, [mute]);

  const next = (isMute: boolean) => {
    setConfirm(true);
    setMute(isMute);
  };

  if (!confirm) {
    return (
      <div id={'container'}>
        <h1>
          Our story uses audio. Enable sound?
        </h1>
        <div>
          <button onClick={() => next(true)}>No</button>
          <button onClick={() => next(false)}>Yes</button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/story1'>
          <Story1 />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;