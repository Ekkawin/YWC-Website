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
    storeData,
    setStoreData,

    storeMerchants,
    setStoreMerchants,

    storeCategories,
    setStoreCategories,

    storeProvinces,
    setStoreProvinces,

    storePriceLevel,
    setStorePriceLevel,

    storeFilteredCategories,
    setStoreFilteredCategories,

    storeFilteredSubCategory,
    setStoreFilteredSubCategory,

    storeFilteredProvince,
    setStoreFilteredProvince,
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
        console.log('data', data);
        console.log('storeDataapp', storeData);
        dataStore.loading = false;
      })
      .catch((error) => {
        console.error(error);
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
