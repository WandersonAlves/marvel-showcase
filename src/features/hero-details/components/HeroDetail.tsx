import { ICharacter } from "../../../interfaces/CharacterInterface";
import { IEditedHero } from "../../../interfaces/ReduxInterface";
import { removeEditHeroAction } from "../../../store/hero-detail/actions";
import { useDispatch } from "react-redux";
import Card from "../../../components/Card";
import DetailsGroup from "./DetailsGroup";
import FlexColumn from "../../../components/Blocks/FlexColumn";
import FlexRow from "../../../components/Blocks/FlexRow";
import HeroDescription from "./HeroDescription";
import HeroForm from "./HeroForm";
import MarvelButton from "../../../components/MarvelButton";
import React, { useState } from "react";
import Separator from "./Separator";
import styled from "styled-components";

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

interface IHeroDetailProps {
  char: ICharacter;
  charImage: string;
  editedChar: IEditedHero | undefined;
  heroID: number;
}

const HeroDetail = ({ char, editedChar, charImage, heroID }: IHeroDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const resetEdit = () => {
    if (editedChar) {
      dispatch(removeEditHeroAction(heroID));
    }
  };

  const renderHeroType = () => {
    if (editedChar?.isBadGuy) {
      return '(Villain)';
    } else if (editedChar?.isGoodGuy) {
      return '(Hero)';
    }
    return '';
  };

  return (
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
          {char.name} {renderHeroType()}
        </h1>
        <FlexRow style={{ marginBottom: 25 }}>
          <DetailsGroup title="series" value={char.series.available} />
          <DetailsGroup title="comics" value={char.comics.available} />
          <DetailsGroup title="events" value={char.events.available} />
          <DetailsGroup title="stories" value={char.stories.available} />
        </FlexRow>
        <HeroDescription description={editedChar?.customDescription || char.description} />
        {isEditing ? <HeroForm editedChar={editedChar} heroID={heroID} /> : null}
      </HeroDetailsFlexColumn>
    </FlexRow>
  );
};

export default HeroDetail;