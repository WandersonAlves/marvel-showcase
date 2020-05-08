import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ContainerShell from '../components/ContainerShell';
import HeroesList from './heroes-list';
import React from 'react';
import TopBar from '../components/TopBar';

const AppShell = () => {
  return (
    <ContainerShell>
      <TopBar />
      <BrowserRouter>
        <Switch>
          <Route path="/heroes">
            <HeroesList />
          </Route>
          <Route path="/">
            <HeroesList />
          </Route>
        </Switch>
      </BrowserRouter>
    </ContainerShell>
  );
};

export default AppShell;
