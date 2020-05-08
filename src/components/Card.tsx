import Chip from './Chip';
import FlexColumn from './Blocks/FlexColumn';
import FlexRow from './Blocks/FlexRow';
import React from 'react';
import styled from 'styled-components';

interface ICardStyledProps {
  readonly picURL: string;
}

interface ICardProps extends ICardStyledProps {
  readonly name: string;
  readonly description?: string;
}

const CardStyled = styled.div<ICardStyledProps>`
  border-radius: 10px;
  margin: 15px;
  width: 25%;
  height: fit-content;
  background-image: url(${props => props.picURL});
  background-position: center;
`;

const CardLayer = styled(FlexColumn)`
  background-color: #0000008c;
  height: 220px;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px 40px;
`;

const CardName = styled.span`
  font-size: 18px;
  color: white;
`;

const Card = ({ picURL, name, description }: ICardProps) => {
  return (
    <CardStyled picURL={picURL}>
      <CardLayer>
        <FlexRow>
          <Chip content="hero" color="blue" />
          <Chip content="villain" color="red" />
        </FlexRow>
        <CardName>{name}</CardName>
      </CardLayer>
    </CardStyled>
  );
};

export default Card;
