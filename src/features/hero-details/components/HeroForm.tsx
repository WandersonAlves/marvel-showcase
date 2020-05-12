import { editHeroAction } from '../../../store/hero-detail/actions';
import { IEditedHero } from '../../../interfaces/ReduxInterface';
import { useDispatch } from 'react-redux';
import Chip from '../../../components/Chip';
import DetailLabel from './DetailLabel';
import FlexRow from '../../../components/Blocks/FlexRow';
import MarvelInput from '../../../components/MarvelInput';
import React, { useState } from 'react';
import Separator from './Separator';
import styled from 'styled-components';

interface IHeroFormProps {
  editedChar: IEditedHero | undefined;
  heroID: number;
}

const HeroTypeFlexRow = styled(FlexRow)`
  flex-direction: row !important;
`;

const HeroForm = ({ editedChar, heroID }: IHeroFormProps) => {
  const dispatch = useDispatch();
  const [descriptionEdit, setDescriptionEdit] = useState('');

  const handleHeroDescriptionChange = (text: string) => {
    setDescriptionEdit(text);
    dispatch(editHeroAction({ ...editedChar, customDescription: text }));
  };

  const handleChipChange = (value: 'villain' | 'hero') => {
    if (editedChar) {
      const copy: IEditedHero = { ...editedChar };
      copy.isBadGuy = value === 'villain' ? true : false;
      copy.isGoodGuy = value === 'villain' ? false : true;
      dispatch(editHeroAction(copy));
      return;
    }
    dispatch(
      editHeroAction({
        id: heroID,
        customDescription: '',
        customName: '',
        isBadGuy: value === 'villain' ? true : false,
        isGoodGuy: value === 'villain' ? false : true,
        rating: 0,
      }),
    );
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

export default HeroForm;
