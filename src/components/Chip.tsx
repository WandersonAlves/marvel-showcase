import React from 'react';
import styled from 'styled-components';

interface IChipContainerProps {
  readonly color?: string;
}

interface IChipProps {
  readonly content: string;
  readonly color?: string;
  readonly onClick?: () => any;
}

const ChipContainer = styled.div<IChipContainerProps>`
  padding: 5px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: ${props => (props.color ? props.color : 'red')};
  width: fit-content;
`;

const Span = styled.span`
  color: white;
  font-weight: 600;
  text-transform: uppercase;
`;

const Chip = ({ content, color, onClick }: IChipProps) => (
  <ChipContainer color={color} onClick={onClick}>
    <Span>{content}</Span>
  </ChipContainer>
);

export default Chip;
