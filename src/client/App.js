import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import AllRoutes from './routes';

class App extends React.Component {
  render() {
    return (
      <Router history={history} location="/">
        <AllRoutes />
      </Router>
    );
  }
}

export default App;
