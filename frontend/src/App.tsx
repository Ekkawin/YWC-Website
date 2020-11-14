import React from 'react';
import './styles/App.css';
import './styles/tailwind.css';
import './styles/App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { NavBar } from './NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route>
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
