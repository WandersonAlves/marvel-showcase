import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import ContainerShell from '../components/ContainerShell';
import HeroDetails from './hero-details';
import HeroesList from './heroes-list';
import React from 'react';
import Title from '../components/Title';
import TopBar from '../components/TopBar';


const AppShell = () => {
  return (
    <ContainerShell>
      <BrowserRouter>
        <TopBar>
          <Title>
            <Link to="/" style={{textDecoration: 'unset', color: 'unset'}}>Marvel Showcase</Link>
          </Title>
        </TopBar>
        <Switch>
          <Route path="/heroes" component={HeroesList} />
          <Route path="/hero-details/:heroID" component={HeroDetails} />
          <Route path="/" component={HeroesList} />
        </Switch>
      </BrowserRouter>
    </ContainerShell>
  );
};

export default AppShell;
