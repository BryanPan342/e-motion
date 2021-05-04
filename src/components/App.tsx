import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Story1 from './pages/Story1';

function App(): JSX.Element {

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