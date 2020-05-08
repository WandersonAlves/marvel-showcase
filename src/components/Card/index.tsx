import Chip from '../Chip';
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
  border-radius: 50px;
  margin: 15px;
  width: 25%;
  height: fit-content;
  background-image: url(${props => props.picURL});
  background-position: center;
`;

const CardLayer = styled.div`
  background-color: #0000008c;
  display: flex;
  height: 220px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 50px;
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
        <Chip content="hero" color="blue" />
        <CardName>{name}</CardName>
      </CardLayer>
    </CardStyled>
  );
};

export default Card;
