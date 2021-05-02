import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Playgroundp5 from './pages/Playgroundp5';

function App(): JSX.Element {

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/playground'>
          <Playgroundp5 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;