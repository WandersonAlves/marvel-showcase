import { IReduxStore } from '../interfaces/ReduxInterface';
import { useSelector } from 'react-redux';
import Chip from './Chip';
import FlexColumn from './Blocks/FlexColumn';
import FlexRow from './Blocks/FlexRow';
import React from 'react';
import styled from 'styled-components';

interface ICardStyledProps {
  readonly picURL: string;
}

interface ICardLayerProps {
  readonly removeBackdrop?: boolean;
}

interface ICardProps extends ICardStyledProps {
  readonly name?: string;
  readonly description?: string;
  readonly onClick?: () => any;
  readonly styles?: React.CSSProperties;
  readonly showVillainChip?: boolean;
  readonly heroID?: number;
  readonly removeBackdrop?: boolean;
}

const CardStyled = styled.div<ICardStyledProps>`
  position: relative;
  border-radius: 10px;
  margin: 15px;
  width: 20%;
  height: 250px;
  transition: transform 0.2s;
  background-image: url(${props => props.picURL});
  background-position: center;
  background-size: cover;
  &:hover {
    transform: scale(1.03);
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-bottom: 15px;
  }
`;

const CardLayer = styled(FlexColumn)<ICardLayerProps>`
  background-color: ${props => (props.removeBackdrop ? 'unset' : '#00000073')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px 40px;
`;

const CardName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: white;
`;

const Card = ({ picURL, name, styles, onClick, heroID, removeBackdrop }: ICardProps) => {
  const char = useSelector((state: IReduxStore) => state.editedHeroes.heroes.find(h => h.id === Number(heroID)));
  return (
    <CardStyled picURL={picURL} onClick={onClick} style={styles} data-testid={`char-${heroID}`}>
      <CardLayer removeBackdrop={removeBackdrop}>
        <FlexRow>
          {char?.isGoodGuy ? <Chip content="hero" color="blue" /> : null}
          {char?.isBadGuy ? <Chip content="villain" color="red" /> : null}
        </FlexRow>
        <CardName>{name}</CardName>
      </CardLayer>
    </CardStyled>
  );
};

export default Card;
