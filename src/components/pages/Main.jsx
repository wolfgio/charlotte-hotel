import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';

class Main extends React.PureComponent {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

export default Main;
