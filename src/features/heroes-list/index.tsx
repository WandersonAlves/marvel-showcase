import { GetCharacters } from '../../api/services/Characters';
import { IReduxStore } from '../../interfaces/ReduxInterface';
import { setHeroesAction, setIsLoadingAction, setHasErrorOnLoadingAction } from '../../store/heroes-list/actions';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import FlexRow from '../../components/Blocks/FlexRow';
import Loading from '../../components/Loading';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled(FlexRow)`
  padding: 40px;
  overflow-x: auto;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeroesList = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state: IReduxStore) => state.heroes.heroes);
  const isLoading = useSelector((state: IReduxStore) => state.heroes.isLoading);
  const hasErrorOnLoading = useSelector((state: IReduxStore) => state.heroes.hasErrorOnLoading);

  const getCharacters = async () => {
    try {
      const { data } = await GetCharacters();
      dispatch(setHeroesAction(data));
    } catch (e) {
      dispatch(setHasErrorOnLoadingAction(true));
      console.error(e);
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  };

  useEffect(() => {
    dispatch(setIsLoadingAction());
    getCharacters();
  }, []);

  const renderHeroes = () =>
    heroes.map(h => <Card key={h.id} picURL={`${h.thumbnail.path}.${h.thumbnail.extension}`} name={h.name} />);

  return <Container>{isLoading ? <Loading /> : renderHeroes()}</Container>;
};

export default HeroesList;
