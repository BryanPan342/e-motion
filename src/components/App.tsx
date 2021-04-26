import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import ThreeJSBackground from './pages/ThreeJSBackground';

function App(): JSX.Element {

  return (
    <Router>
      <Switch>
        <Route exact path='/bryan'>
          <ThreeJSBackground />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;