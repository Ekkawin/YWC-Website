import React, { useEffect } from 'react';
import './styles/App.css';
import './styles/tailwind.css';
import './styles/App.css';
import 'antd/dist/antd.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { NavBar } from './NavBar';
import axios from 'axios';
import { dataStore } from './stores/dataStore';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
  const {
    setStoreData,

    setStoreCategories,

    setStoreProvinces,

    setStoreFilteredCategories,
  } = dataStore;
  useEffect(() => {
    dataStore.loading = true;
    axios
      .get('https://panjs.com/ywc18.json')
      .then((data) => {
        setStoreData(data?.data);
        setStoreCategories(data?.data?.categories);
        setStoreFilteredCategories(data?.data?.categories[0]);
        setStoreProvinces(data?.data?.provinces);

        dataStore.loading = false;
      })
      .catch((error) => {
        console.error(error);
        dataStore.isApiError = true;
      });
  }, []);
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
});
