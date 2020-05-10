import { GetCharactersFactory, GetNullableCharacterFactory } from '../../factories/CharacterFactory';
import { getMarvelCharacter } from '../../api/services/Characters';
import { ICharacter } from '../../interfaces/CharacterInterface';
import { IReduxStore } from '../../interfaces/ReduxInterface';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import DetailsGroup from './components/DetailsGroup';
import FlexColumn from '../../components/Blocks/FlexColumn';
import FlexRow from '../../components/Blocks/FlexRow';
import HeroDetailsContainer from './components/HeroDetailsContainer';
import HeroImageContainer from './components/HeroImageContainer';
import Loading from '../../components/Loading';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Separator from './components/Separator';

interface HeroDetailsProps {
  heroID: string;
}

const HeroDetails: FunctionComponent<HeroDetailsProps> = () => {
  const { heroID } = useParams<HeroDetailsProps>();
  const [isLoading, setLoading] = useState(true);
  const [charImage, setCharImage] = useState('');
  const [currentChar, setCurrentChar] = useState<ICharacter>(GetNullableCharacterFactory());
  const characterFromStore = useSelector((state: IReduxStore) => state.heroes.heroes.find(h => h.id === Number(heroID)));

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
  }, []);

  const renderHeroDetail = () => (
    <FlexRow style={{ flexWrap: 'unset' }}>
      <Card picURL={charImage} styles={{ width: '25%', height: 450 }} removeBackdrop />
      <FlexColumn style={{ marginLeft: 80}}>
        <h1>{currentChar.name}</h1>
        <FlexRow style={{marginBottom: 25}}>
          <DetailsGroup title="series" value={currentChar.series.available}/>
          <DetailsGroup title="comics" value={currentChar.comics.available}/>
          <DetailsGroup title="events" value={currentChar.events.available}/>
          <DetailsGroup title="stories" value={currentChar.stories.available}/>
        </FlexRow>
        <Separator />
        <span style={{ fontWeight: 600 }}>{currentChar.description}</span>
      </FlexColumn>
    </FlexRow>
  );

  return (
    <HeroDetailsContainer>
      <HeroImageContainer picURL={charImage} />
      {isLoading ? <Loading /> : renderHeroDetail()}
    </HeroDetailsContainer>
  );
};

export default HeroDetails;
