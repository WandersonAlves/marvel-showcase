import ContainerShell from '../components/ContainerShell';
import HeroesList from './heroes-list';
import React from 'react';
import TopBar from '../components/TopBar';

const AppShell = () => {
  return (
    <ContainerShell>
      <TopBar />
      <HeroesList />
    </ContainerShell>
  );
};

export default AppShell;
