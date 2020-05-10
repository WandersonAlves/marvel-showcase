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
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import FlexColumn from '../../components/Blocks/FlexColumn';
import FlexRow from '../../components/Blocks/FlexRow';
import Loading from '../../components/Loading';
import LoadingMore from './components/LoadingMore';
import MarvelInput from '../../components/MarvelInput';
import NoResults from './components/NoResults';
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
  width: 100%;
  height: 100%;
`;

const HeroesList = () => {
  let marvelInputDebounceFn: () => void;
  const dispatch = useDispatch();
  const [lastKnowSearch, setLastKnowSearch] = useState('');
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [allowRedirect, setAllowRedirect] = useState(false);
  const [selectedHeroID, setSelectedHeroID] = useState(0);
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
    setLoadingMore(true);
    try {
      const { data } = await getMarvelCharacters({ offset, limit: 20, nameStartsWith: lastKnowSearch || undefined });
      if (lastKnowSearch) {
        return dispatch(setAddMoreSearchHeroesAction(data));
      }
      dispatch(setAddMoreHeroesAction(data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const getSearchCharacters = async (text: string) => {
    try {
      const { data } = await getMarvelCharacters({ nameStartsWith: text });
      dispatch(setSearchHeroesAction(data));
      setIsSearching(false);
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
        setIsSearching(true);
        if (value) {
          setLastKnowSearch(value);
          getSearchCharacters(value);
          return;
        }
        setLastKnowSearch('');
        setIsSearching(false);
        dispatch(setResetSearchAction());
      }, 500);
    }
    marvelInputDebounceFn();
  };

  const handleCardClick = (char: ICharacter) => {
    setSelectedHeroID(char.id);
    setAllowRedirect(true);
    dispatch(setResetSearchAction())
  };

  const renderHeroesContainer = () => (
    <Container onScroll={handleScroll}>
      <MarvelInput placeholder="Search for a character" onChange={handleMarvelInputChange} />
      {isSearching ? (
        <Loading />
      ) : (
        <HeroesContainer>
          {renderHeroes()}
          {isLoadingMore ? <LoadingMore /> : null}
        </HeroesContainer>
      )}
    </Container>
  );

  const renderHeroes = () => {
    const renderCard = (h: ICharacter) => (
      <Card key={h.id} heroID={h.id} picURL={`${h.thumbnail.path}.${h.thumbnail.extension}`} name={h.name} onClick={() => handleCardClick(h)} />
    );
    if (searchedHeroes.length) {
      return searchedHeroes.map(h => renderCard(h));
    } else if (!searchedHeroes.length && lastKnowSearch) {
      return <NoResults />;
    }
    return heroes.map(h => renderCard(h));
  };

  const renderHeroesOrRedirect = () =>
    selectedHeroID && allowRedirect ? <Redirect to={`/hero-details/${selectedHeroID}`} /> : renderHeroesContainer();

  return isLoading ? <Loading /> : renderHeroesOrRedirect();
};

export default HeroesList;
