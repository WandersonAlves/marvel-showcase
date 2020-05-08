import {
  setHeroesAction,
  setIsLoadingAction,
  setHasErrorOnLoadingAction,
  setAddMoreHeroesAction,
} from '../../store/heroes-list/actions';
import { getMarvelCharacters } from '../../api/services/Characters';
import { IReduxStore } from '../../interfaces/ReduxInterface';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import FlexRow from '../../components/Blocks/FlexRow';
import Loading from '../../components/Loading';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled(FlexRow)`
  padding: 40px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-x: auto;
`;

const HeroesList = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state: IReduxStore) => state.heroes.heroes);
  const isLoading = useSelector((state: IReduxStore) => state.heroes.isLoading);
  const hasErrorOnLoading = useSelector((state: IReduxStore) => state.heroes.hasErrorOnLoading);

  const getCharacters = async () => {
    try {
      const { data } = await getMarvelCharacters({ offset: 0, limit: 20 });
      dispatch(setHeroesAction(data));
    } catch (e) {
      dispatch(setHasErrorOnLoadingAction(true));
      console.error(e);
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  };

  const getMoreCharacters = async (offset: number) => {
    try {
      const { data } = await getMarvelCharacters({ offset, limit: 20 });
      dispatch(setAddMoreHeroesAction(data));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    dispatch(setIsLoadingAction());
    getCharacters();
  }, []);

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      getMoreCharacters(heroes.length);
    }
  };

  const renderHeroesContainer = () => <Container onScroll={handleScroll}>{renderHeroes()}</Container>;

  const renderHeroes = () =>
    heroes.map(h => <Card key={h.id} picURL={`${h.thumbnail.path}.${h.thumbnail.extension}`} name={h.name} />);

  return isLoading ? <Loading /> : renderHeroesContainer();
};

export default HeroesList;
