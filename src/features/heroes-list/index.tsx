import {
  setHeroesAction,
  setIsLoadingAction,
  setHasErrorOnLoadingAction,
  setAddMoreHeroesAction,
  setSearchHeroesAction,
  setResetSearchAction,
  setAddMoreSearchHeroesAction,
} from '../../store/heroes-list/actions';
import { debounce } from 'lodash';
import { getMarvelCharacters } from '../../api/services/Characters';
import { ICharacter } from '../../interfaces/CharacterInterface';
import { IReduxStore } from '../../interfaces/ReduxInterface';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import FlexColumn from '../../components/Blocks/FlexColumn';
import FlexRow from '../../components/Blocks/FlexRow';
import Loading from '../../components/Loading';
import MarvelInput from '../../components/MarvelInput';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled(FlexColumn)`
  padding: 40px;
  align-items: center;
  overflow-x: auto;
`;

const HeroesContainer = styled(FlexRow)`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const HeroesList = () => {
  let marvelInputDebounceFn: () => void;
  const dispatch = useDispatch();
  const [lastKnowSearch, setLastKnowSearch] = useState('');
  const heroes = useSelector((state: IReduxStore) => state.heroes.heroes);
  const searchedHeroes = useSelector((state: IReduxStore) => state.heroes.searchedHeroes);
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
      const { data } = await getMarvelCharacters({ offset, limit: 20, nameStartsWith: lastKnowSearch || undefined });
      if (lastKnowSearch) {
        return dispatch(setAddMoreSearchHeroesAction(data));
      }
      dispatch(setAddMoreHeroesAction(data));
    } catch (e) {
      console.error(e);
    }
  };

  const getSearchCharacters = async (text: string) => {
    try {
      const { data } = await getMarvelCharacters({ nameStartsWith: text });
      dispatch(setSearchHeroesAction(data));
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
      getMoreCharacters(searchedHeroes.length || heroes.length);
    }
  };

  const handleMarvelInputChange = (e: React.ChangeEvent) => {
    e.persist();
    if (!marvelInputDebounceFn) {
      marvelInputDebounceFn = debounce(() => {
        // @ts-ignore
        const value = e.target.value;
        if (value) {
          setLastKnowSearch(value);
          getSearchCharacters(value);
          return;
        }
        setLastKnowSearch('');
        dispatch(setResetSearchAction());
      }, 300);
    }
    marvelInputDebounceFn();
  };

  const renderHeroesContainer = () => (
    <Container onScroll={handleScroll}>
      <MarvelInput
        style={{ width: '25%', marginBottom: 20 }}
        placeholder="Search for a character"
        onChange={handleMarvelInputChange}
      />
      <HeroesContainer>{renderHeroes()}</HeroesContainer>
    </Container>
  );

  const renderHeroes = () => {
    const renderCard = (h: ICharacter) => (
      <Card key={h.id} picURL={`${h.thumbnail.path}.${h.thumbnail.extension}`} name={h.name} />
    );
    if (searchedHeroes.length) {
      return searchedHeroes.map(h => renderCard(h));
    }
    return heroes.map(h => renderCard(h));
  };

  return isLoading ? <Loading /> : renderHeroesContainer();
};

export default HeroesList;
