import { setBatchEditHeroAction } from '../store/hero-detail/actions';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ContainerShell from '../components/ContainerShell';
import HeroDetails from './hero-details';
import HeroesList from './heroes-list';
import React, { useEffect } from 'react';
import Title from '../components/Title';
import TopBar from '../components/TopBar';


const AppShell = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const savedEditedHeroes = JSON.parse(localStorage.getItem('edited-heroes') || '"heroes": []');
    dispatch(setBatchEditHeroAction(savedEditedHeroes.heroes));
  }, [])

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
