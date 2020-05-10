import { GetCharactersFactory, GetNullableCharacterFactory } from '../../factories/CharacterFactory';
import { getMarvelCharacter } from '../../api/services/Characters';
import { ICharacter } from '../../interfaces/CharacterInterface';
import { IReduxStore } from '../../interfaces/ReduxInterface';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FlexColumn from '../../components/Blocks/FlexColumn';
import Loading from '../../components/Loading';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface HeroDetailsProps {
  heroID: string;
}

const Container = styled(FlexColumn)`
  padding: 40px;
  align-items: center;
  overflow-x: auto;
`;

const HeroDetails: FunctionComponent<HeroDetailsProps> = () => {
  const { heroID } = useParams<HeroDetailsProps>();
  const [isLoading, setLoading] = useState(true);
  const [currentChar, setCurrentChar] = useState<ICharacter>(GetNullableCharacterFactory());
  const characterFromStore = useSelector((state: IReduxStore) => state.heroes.heroes.find(h => h.id === Number(heroID)));

  const fetchCharacterFromStoreOrAPI = async () => {
    if (characterFromStore) {
      setLoading(false);
      setCurrentChar(characterFromStore);
      return;
    }
    try {
      const { data } = await getMarvelCharacter(Number(heroID));
      const [formattedResult] = GetCharactersFactory(data);
      setCurrentChar(formattedResult);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCharacterFromStoreOrAPI();
  }, []);

  const renderHeroDetail = () => (
    <span>{currentChar?.name}</span>
  );

  return (
    <Container>
      {isLoading ? <Loading/> : renderHeroDetail()}
    </Container>
  );
};

export default HeroDetails;
