import { editHeroAction, loadMoreSeriesAction } from '../../store/hero-detail/actions';
import { GetCharactersFactory, GetNullableCharacterFactory } from '../../factories/CharacterFactory';
import { getMarvelCharacter } from '../../api/services/Characters';
import { ICharacter } from '../../interfaces/CharacterInterface';
import { IReduxStore } from '../../interfaces/ReduxInterface';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeroDetail from './components/HeroDetail';
import HeroImageContainer from './components/HeroImageContainer';
import HeroSeriesList from './components/HeroSeriesList';
import Loading from '../../components/Loading';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';


const HeroDetailsContainer = styled.div`
  height: 100vh;
  padding: 40px;
  align-items: center;
  overflow-x: auto;
`;

interface HeroDetailsProps {
  heroID: string;
}

const HeroDetails: FunctionComponent<HeroDetailsProps> = () => {
  const dispatch = useDispatch();
  const { heroID } = useParams<HeroDetailsProps>();
  const [isLoading, setLoading] = useState(true);
  const [charImage, setCharImage] = useState('');
  const [currentChar, setCurrentChar] = useState<ICharacter>(GetNullableCharacterFactory());
  const characterFromStore = useSelector((state: IReduxStore) => state.heroes.heroes.find(h => h.id === Number(heroID)));
  const editedChar = useSelector((state: IReduxStore) => state.editedHeroes.heroes.find(h => h.id === Number(heroID)));

  const fetchCharacterFromStoreOrAPI = async () => {
    if (characterFromStore) {
      setLoading(false);
      setCurrentChar(characterFromStore);
      setCharImage(`${characterFromStore.thumbnail.path}.${characterFromStore.thumbnail.extension}`);
      return;
    }
    try {
      const { data } = await getMarvelCharacter(Number(heroID));
      const [formattedResult] = GetCharactersFactory(data);
      setCurrentChar(formattedResult);
      setCharImage(`${formattedResult.thumbnail.path}.${formattedResult.thumbnail.extension}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterFromStoreOrAPI();
    if (!editedChar) {
      dispatch(
        editHeroAction({
          id: Number(heroID),
          customDescription: '',
          customName: '',
          isBadGuy: false,
          isGoodGuy: false,
          rating: 0,
        }),
      );
    }
  }, []);

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log('Hi from bottom')
      dispatch(loadMoreSeriesAction());
    }
  };

  return (
    <HeroDetailsContainer onScroll={handleScroll}>
      <HeroImageContainer picURL={charImage} />
      {isLoading ? (
        <Loading />
      ) : (
        <HeroDetail heroID={Number(heroID)} char={currentChar} editedChar={editedChar} charImage={charImage} />
      )}
      <HeroSeriesList heroID={heroID} />
    </HeroDetailsContainer>
  );
};

export default HeroDetails;
