import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import "./scss/main.scss";
import Main from './components/pages/Main';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
         <Main />
      </Router>
    );
  }
}

export default App;
