import { GetCharactersFactory, GetNullableCharacterFactory } from '../../factories/CharacterFactory';
import { getMarvelCharacter } from '../../api/services/Characters';
import { ICharacter } from '../../interfaces/CharacterInterface';
import { IReduxStore, IEditedHero } from '../../interfaces/ReduxInterface';
import { setEditHeroAction, setRemoveEditHeroAction } from '../../store/hero-detail/actions';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import DetailLabel from './components/DetailLabel';
import DetailsGroup from './components/DetailsGroup';
import FlexColumn from '../../components/Blocks/FlexColumn';
import FlexRow from '../../components/Blocks/FlexRow';
import HeroDetailsContainer from './components/HeroDetailsContainer';
import HeroImageContainer from './components/HeroImageContainer';
import HeroSeriesList from './components/HeroSeriesList';
import Loading from '../../components/Loading';
import MarvelButton from '../../components/MarvelButton';
import MarvelInput from '../../components/MarvelInput';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Separator from './components/Separator';
import styled from 'styled-components';

interface HeroDetailsProps {
  heroID: string;
}

const HeroFlexColumn = styled(FlexColumn)`
  width: 18%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeroDetailsFlexColumn = styled(FlexColumn)`
  margin-left: 80px;
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const HeroTypeFlexRow = styled(FlexRow)`
  flex-direction: row !important;
`;

const HeroDetails: FunctionComponent<HeroDetailsProps> = () => {
  const dispatch = useDispatch();
  const { heroID } = useParams<HeroDetailsProps>();
  const [isLoading, setLoading] = useState(true);
  const [charImage, setCharImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState('');
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
        setEditHeroAction({
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

  const handleChipChange = (value: 'villain' | 'hero') => {
    if (editedChar) {
      const copy: IEditedHero = { ...editedChar };
      copy.isBadGuy = value === 'villain' ? true : false;
      copy.isGoodGuy = value === 'villain' ? false : true;
      dispatch(setEditHeroAction(copy));
      return;
    }
    dispatch(
      setEditHeroAction({
        id: Number(heroID),
        customDescription: '',
        customName: '',
        isBadGuy: value === 'villain' ? true : false,
        isGoodGuy: value === 'villain' ? false : true,
        rating: 0,
      }),
    );
  };

  const renderHeroType = () => {
    if (editedChar?.isBadGuy) {
      return '(Villain)';
    } else if (editedChar?.isGoodGuy) {
      return '(Hero)';
    }
    return '';
  };

  const renderHeroDescription = () => {
    if (currentChar.description || editedChar?.customDescription) {
      return (
        <>
          <Separator />
          <span style={{ fontWeight: 600 }}>{editedChar?.customDescription || currentChar.description}</span>
        </>
      );
    }
    return null;
  };

  const resetEdit = () => {
    if (editedChar) {
      setDescriptionEdit('');
      dispatch(setRemoveEditHeroAction(Number(heroID)));
    }
  };

  const renderHeroForm = () => {
    const handleHeroDescriptionChange = (text: string) => {
      if (editedChar) {
        setDescriptionEdit(text);
        dispatch(setEditHeroAction({ ...editedChar, customDescription: text }));
      }
    };
    return (
      <>
        <Separator />
        <HeroTypeFlexRow style={{ marginBottom: 20, alignItems: 'center' }}>
          <DetailLabel>Char type:</DetailLabel>
          <Chip content="villain" color="red" onClick={() => handleChipChange('villain')} />
          <Chip content="hero" color="blue" onClick={() => handleChipChange('hero')} />
        </HeroTypeFlexRow>
        <MarvelInput
          placeholder="Set a custom description, erase to reset"
          value={descriptionEdit}
          onChange={e => handleHeroDescriptionChange(e.target.value)}
        />
      </>
    );
  };

  const renderHeroDetail = () => (
    <FlexRow style={{ flexWrap: 'unset' }}>
      <HeroFlexColumn>
        <Card picURL={charImage} styles={{ width: '100%', height: 450, margin: '25px 0' }} removeBackdrop />
        <Separator />
        <FlexRow>
          <MarvelButton onClick={() => setIsEditing(!isEditing)} style={{ marginRight: 20 }}>
            edit
          </MarvelButton>
          <MarvelButton onClick={resetEdit}>reset</MarvelButton>
        </FlexRow>
      </HeroFlexColumn>
      <HeroDetailsFlexColumn>
        <h1>
          {currentChar.name} {renderHeroType()}
        </h1>
        <FlexRow style={{ marginBottom: 25 }}>
          <DetailsGroup title="series" value={currentChar.series.available} />
          <DetailsGroup title="comics" value={currentChar.comics.available} />
          <DetailsGroup title="events" value={currentChar.events.available} />
          <DetailsGroup title="stories" value={currentChar.stories.available} />
        </FlexRow>
        {renderHeroDescription()}
        {isEditing ? renderHeroForm() : null}
      </HeroDetailsFlexColumn>
    </FlexRow>
  );

  return (
    <HeroDetailsContainer>
      <HeroImageContainer picURL={charImage} />
      {isLoading ? <Loading /> : renderHeroDetail()}
      <HeroSeriesList heroID={heroID}/>
    </HeroDetailsContainer>
  );
};

export default HeroDetails;
