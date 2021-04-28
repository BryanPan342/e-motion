import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import P5jsBackground from './pages/P5jsBackground';

function App(): JSX.Element {

  return (
    <Router>
      <Switch>
      <Route path='/pages/P5jsBackground'>
          <P5jsBackground />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;